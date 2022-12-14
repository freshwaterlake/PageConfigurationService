const repository = require('../repository/page-config.repository');
const excelReader = require('../_common/excel-reader');
const config = require('../config/config');

const refresh = async () => {
    // console.log(`Trying to read the file : ${config.fileUrl.pageConfigFileUrl}`);
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

    return {
        id: pageId,
        title: page['title'],
        breadCrumbs: getBreadCrumbs(page['breadCrumbs'], data),
        sections: page['sections'].split(',').map((value) => value.trim()),
        sectionRepository: getSectionRepository(page['sections'], data),
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

const getSectionRepository = (sectionsText, data) => {
    const sectionRepository = [];
    if (!sectionsText) return sectionRepository;

    sectionsText
        .split(',')
        .map((value) => value.trim())
        .map((sectionId) => sectionRepository.push(getSectionJSON(sectionId, data)));

    return sectionRepository;
};

const getSectionJSON = (sectionId, data) => {
    const section = data['sections'].find((section) => section.id === sectionId);
    return {
        id: sectionId,
        title: section['title'],
        type: section['type'],
        className: section['className'],
        controlGroup: getSectionControlGroupJSON(sectionId, data),
    };
};

const getSectionControlGroupJSON = (sectionId, data) => {
    const sectionControls = data['sectionControls'].filter((control) => control.sectionId === sectionId);
    const controlGroup = [];

    sectionControls.map((control) => {
        const subControlGroup = [];
        const isComplexControl = data['controlTypeMaster'].find((controlType) => controlType['controlType'] === control['type'])[
            'isComplex'
        ];

        const { tableName, columnName, id, ...controlProps } = {
            ...data['controlProps'].find((controlProp) => controlProp.id === control.id),
            tableName: null,
            columnName: null,
        };

        const controlJSON = {
            id: control.id,
            type: control.type,
            className: control.className,
            props: isComplexControl ? { label: control['label'], className: control['className'] } : controlProps,
            controlGroup: getSectionComplexControl_ControlGroupJSON(control, data),
        };
        controlGroup.push(controlJSON);
    });

    return controlGroup;
};

const getSectionComplexControl_ControlGroupJSON = (complexControl, data) => {
    const isComplexControl = data['controlTypeMaster'].find((controlType) => controlType['controlType'] === complexControl['type']);
    if (!isComplexControl) return [];

    const controlGroup = [];

    const subControls = data['complexControls'].filter((subControl) => subControl.id === complexControl.id);

    subControls.map((subControl) => {
        const { tableName, columnName, id, ...controlProps } = data['controlProps'].find(
            (controlProp) => controlProp.id === subControl.controlId
        );

        const controlJSON = {
            id: subControl.controlId,
            type: subControl.type,
            className: subControl.className,
            props: processControlPropsForComplexControls(complexControl, controlProps),
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
