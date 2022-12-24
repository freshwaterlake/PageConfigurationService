const repository = require('../repository/page-config.repository');
const excelReader = require('../_common/excel-reader');
const config = require('../config/config');

const refresh = async () => {
    console.log(`Trying to read the file : ${config.fileUrl.pageConfigFileUrl}`);
    excelReader.getExcelData(config.fileUrl.pageConfigFileUrl).then((data) => {
        data['pages'].map((page) => {
            const pageId = page['id'];
            repository.save(pageId, getPageJSON(pageId, data));
        });
    });
};

// Private Functions
const getPageJSON = (pageId, data) => {
    const page = data['pages'].find((pageInfo) => pageInfo.id === pageId);

    const sections = data['sections'].filter((section) => section.pageId === pageId).map((data) => data.id);

    return {
        ...page,
        breadCrumbs: getBreadCrumbs(page['breadCrumbs'], data),
        sections: sections,
        sectionRepository: getSectionRepository(sections, data),
    };
};

const getBreadCrumbs = (breadCrumbsText, data) => {
    const breadCrumbsColl = [];
    if (!breadCrumbsText) return [];

    breadCrumbsText
        .split(',')
        .map((value) => value.trim())
        .map((breadCrumb) => {
            breadCrumbsColl.push(data['breadCrumbs'].find((bc) => bc['Name'] === breadCrumb));
        });

    return breadCrumbsColl;
};

const getSectionRepository = (sections, data) => {
    const sectionRepository = [];
    if (sections?.length === 0) return sectionRepository;

    sections?.map((sectionId) => sectionRepository.push(getSectionJSON(sectionId, data)));

    return sectionRepository;
};

const getSectionJSON = (sectionId, data) => {
    const section = data['sections'].find((section) => section.id === sectionId);
    return {
        id: sectionId,
        title: section['title'] === 'NO_TITLE' ? '' : section['title'],
        type: section['type'],
        className: section['className'],
        controlGroup: getSectionControlGroupJSON(section['combinedKey'], data),
    };
};

const controlIdFromTableColumnId = (tableColumnId, data) =>
    data['controlProps'].find((control) => control.tableColumnId === tableColumnId)['id'];

const getSectionControlGroupJSON = (sectionCombinedKey, data) => {
    const sectionControls = data['sectionControls'].filter((control) => control.sectionId === sectionCombinedKey);
    const controlGroup = [];

    sectionControls.map((control) => {
        const subControlGroup = [];
        const isComplexControl = data['controlTypeMaster'].find((controlType) => controlType['controlTypeCode'] === control['type'])[
            'isComplex'
        ];

        const { tableName, columnName, id, ...controlProps } = {
            ...data['controlProps'].find((controlProp) => controlProp.id === control.id),
            tableName: null,
            columnName: null,
        };

        if (isComplexControl) {
            controlGroup.push({
                id: control.id,
                type: control.type,
                className: control.className,
                props: isComplexControl
                    ? { label: control['label'], className: control['className'] }
                    : { ...controlProps, label: control['label'] },
                controlGroup: getSectionComplexControl_ControlGroupJSON(control, data),
            });
        } else {
            controlGroup.push({
                id: controlIdFromTableColumnId(control.tableColumnId, data),
                type: control.type,
                className: control.className,
                props: isComplexControl
                    ? { label: control['label'], className: control['className'] }
                    : { ...controlProps, label: control['label'] },
            });
        }
    });

    return controlGroup;
};

const getSectionComplexControl_ControlGroupJSON = (complexControl, data) => {
    const isComplexControl = data['controlTypeMaster'].find((controlType) => controlType['controlTypeCode'] === complexControl['type']);
    if (!isComplexControl) return [];

    const controlGroup = [];

    const subControls = data['complexControls'].filter((subControl) => subControl.id === complexControl.tableColumnId);

    subControls.map((subControl) => {
        const { tableName, columnName, id, ...controlProps } = data['controlProps'].find(
            (controlProp) => controlProp.tableColumnId === subControl.tableColumnId
        );

        const { tableColumnId, ...complexControlProps } = { ...processControlPropsForComplexControls(complexControl, controlProps) };

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
    switch (complexControl['type']) {
        case 'MULTI_SELECT_WAI_1': {
            const { label, ...rest } = controlProps;
            return rest;
        }

        case 'MULTI_SELECT_WAI_3': {
            const { label, ...rest } = controlProps;
            return rest;
        }

        case 'YEAR_AND_MONTH': {
            const { label, ...rest } = controlProps;
            return rest;
        }

        default:
        //
    }
};

module.exports = { refresh };
