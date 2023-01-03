const repository = require("../repository/page-config.repository");
const excelReader = require("../_common/excel-reader");
const config = require("../config/config");

const refresh = async () => {
  // console.log(`Trying to read the file : ${config.fileUrl.pageConfigFileUrl}`);
  excelReader.getExcelData(config.fileUrl.pageConfigFileUrl).then((data) => {
    data["pages"].map((page) => {
      const pageId = page["id"];
      repository.save(pageId, getPageJSON(pageId, data));
    });
  });
};

// Private Functions
const getPageJSON = (pageId, data) => {
  const page = data["pages"].find((pageInfo) => pageInfo.id === pageId);

  const sections = data["sections"].filter((section) => section.pageId === pageId);

  return {
    ...page,
    breadCrumbs: getBreadCrumbs(page["breadCrumbs"], data),
    sections: sections.map((section) => section.id),
    sectionRepository: getSectionRepository(sections, data),
  };
};

const getBreadCrumbs = (breadCrumbsText, data) => {
  const breadCrumbsColl = [];
  if (!breadCrumbsText) return [];

  breadCrumbsText
    .split(",")
    .map((value) => value.trim())
    .map((breadCrumb) => {
      breadCrumbsColl.push(data["breadCrumbs"].find((bc) => bc["Name"] === breadCrumb));
    });

  return breadCrumbsColl;
};

const getSectionRepository = (sections, data) => {
  const sectionRepository = [];
  if (sections?.length === 0) return sectionRepository;

  sections?.map((section) => sectionRepository.push(getSectionJSON(section["combinedKey"], data)));

  return sectionRepository;
};

const getSectionJSON = (sectionKey, data) => {
  const section = data["sections"].find((section) => section.combinedKey === sectionKey);
  return {
    id: section["id"],
    title: section["title"] === "NO_TITLE" ? "" : section["title"],
    dataId: section["dataId"],
    type: section["type"],
    className: section["className"],
    hideExpression: section["hideExpression"],
    controlGroup: getSectionControlGroupJSON(section["combinedKey"], data),
  };
};

const getControlIdFromTableColumnId = (tableColumnId, data) =>
  data["controlProps"].find((control) => control.tableColumnId === tableColumnId)["id"];

const getSectionControlGroupJSON = (sectionCombinedKey, data) => {
  const sectionControls = data["sectionControls"].filter((control) => control.sectionKey === sectionCombinedKey);
  const controlGroup = [];

  sectionControls.forEach((control) => {
    const subControlGroup = [];

    if (control.type === "SPACER") {
      controlGroup.push({ id: "spacer", type: "SPACER" });
      return;
    }

    const isComplexControl = data["controlTypeMaster"].find((controlType) => controlType["controlTypeCode"] === control["type"])[
      "isComplex"
    ];

    if (isComplexControl) {
      controlGroup.push({
        id: control.tableColumnId,
        type: control.type,
        dataId: control.dataId,
        required: control.required,
        customValidations: control["customValidations"],
        hideExpression: control["hideExpression"],
        className: control.className,
        props: {
          label: control["label"],
          className: control["className"],
        },
        controlGroup: getSectionComplexControl_ControlGroupJSON(control, data),
      });
    } else {
      const { tableName, columnName, id, tableColumnId, ...controlProps } = {
        ...data["controlProps"].find((controlProp) => controlProp.id === getControlIdFromTableColumnId(control.tableColumnId, data)),
        tableName: null,
        columnName: null,
      };

      controlGroup.push({
        id: getControlIdFromTableColumnId(control.tableColumnId, data),
        type: control.type,
        className: control.className,
        required: control.required,
        customValidations: control["customValidations"],
        hideExpression: control["hideExpression"],
        props: { ...controlProps, label: control["label"] },
      });
    }
  });

  return controlGroup;
};

const getSectionComplexControl_ControlGroupJSON = (complexControl, data) => {
  const isComplexControl = data["controlTypeMaster"].find((controlType) => controlType["controlTypeCode"] === complexControl["type"]);
  if (!isComplexControl) return [];

  const controlGroup = [];

  const subControls = data["complexControls"].filter((subControl) => subControl.id === complexControl.tableColumnId);

  subControls.map((subControl) => {
    const { tableName, columnName, id, ...controlProps } = data["controlProps"].find(
      (controlProp) => controlProp.tableColumnId === subControl.tableColumnId
    );
    const { tableColumnId, ...complexControlProps } = {
      ...processControlPropsForComplexControls(complexControl, controlProps),
    };

    const controlJSON = {
      id: id,
      type: subControl.type,
      className: subControl.className,
      props: complexControlProps,
    };
    controlGroup.push(controlJSON);
  });

  return controlGroup;
};

const processControlPropsForComplexControls = (complexControl, controlProps) => {
  switch (complexControl["type"]) {
    case "MULTI_SELECT_WAI_1": {
      const { label, ...rest } = controlProps;
      return rest;
    }

    case "MULTI_SELECT_WAI_3": {
      const { label, ...rest } = controlProps;
      return rest;
    }

    case "YEAR_AND_MONTH": {
      const { label, ...rest } = controlProps;
      return rest;
    }

    default:
      return controlProps;
  }
};

module.exports = { refresh };
