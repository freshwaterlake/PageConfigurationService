WITH RECURSIVE 
	PastYears AS (SELECT YEAR(SYSDATE()) AS VALUE UNION ALL SELECT VALUE - 1 FROM PastYears LIMIT 50) ,
	FutureYears AS (SELECT YEAR(SYSDATE()) AS VALUE UNION ALL SELECT VALUE - 1 FROM FutureYears LIMIT 50) ,
	grade AS (SELECT 0 AS VALUE UNION ALL SELECT VALUE + 1 FROM grade LIMIT 7)
SELECT 'GRADE_A_STAR_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'A*') CODE,  CONCAT(VALUE, 'A*') VALUE, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_A_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'A') CODE,  CONCAT(VALUE, 'A') VALUE, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_B_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'B') CODE,  CONCAT(VALUE, 'B') VALUE, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_C_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'C') CODE,  CONCAT(VALUE, 'C') VALUE, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_D_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'D') CODE,  CONCAT(VALUE, 'D') VALUE, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_E_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'E') CODE,  CONCAT(VALUE, 'E') VALUE, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_A_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'A') CODE,  CONCAT(VALUE, 'A') VALUE, NULL parentCode, NULL displayOrder FROM grade UNION ALL
SELECT 'PAST_YEAR_CODE' categoryCode, VALUE CODE,  VALUE, NULL parentCode, NULL displayOrder FROM PastYears UNION ALL 
SELECT 'FUTURE_YEAR_CODE' categoryCode, VALUE CODE,  VALUE, NULL parentCode, NULL displayOrder FROM FutureYears UNION ALL 
SELECT 'EDUCATIONAL_OR_EMPLOYMENT_STATUS_CODE' categoryCode, current_status_id CODE, current_status VALUE, NULL parentCode, priority displayOrder FROM alumni2_currentstatuses UNION ALL
SELECT 'COUNTRY_CODE' categoryCode, country_id CODE, country_name VALUE, NULL parentCode, display_order displayOrder FROM tbl_country_master WHERE is_active = 'Y' UNION ALL
SELECT 'CITY_CODE' categoryCode, city_id CODE, city_name VALUE, country_id parentCode, display_order displayOrder FROM tbl_city_master WHERE is_active = 'Y' UNION ALL
SELECT 'CLASS_12_CURRICULUM_CODE' categoryCode, board_id CODE, board_name VALUE, board_category parentCode, NULL displayOrder FROM lookup_board UNION ALL
SELECT 'INDUSTRY_CODE' categoryCode, industry_id CODE, industry VALUE, NULL parentCode, priority displayOrder FROM alumni2_industries WHERE STATUS = 1 UNION ALL
SELECT 'FUNCTIONAL_AREA_CODE' categoryCode, functionalarea_id CODE, functionalarea VALUE, NULL parentCode, priority displayOrder FROM alumni2_functionalarea WHERE STATUS = 1 UNION ALL
SELECT 'SKILL_CODE' categoryCode, skill_id CODE, skill VALUE, NULL parentCode, priority displayOrder FROM alumni2_skills WHERE STATUS = 1 UNION ALL
SELECT 'SKILL_LEVEL_CODE' categoryCode, skill_level_id CODE, skill_level VALUE, NULL parentCode, priority displayOrder FROM alumni2_skill_levels WHERE STATUS = 1 UNION ALL
SELECT 'ACHIEVEMENT_CODE' categoryCode, achievement_type_id CODE, achievement_type VALUE, NULL parentCode, priority displayOrder FROM alumni2_achievement_types WHERE STATUS = 1 UNION ALL
SELECT 'TARGET_AUDIENCE_CODE' categoryCode, member_type_id CODE, member_type VALUE, NULL parentCode, priority displayOrder FROM alumni2_member_types WHERE STATUS = 1 UNION ALL
SELECT 'STUDY_PROGRAM_CODE' categoryCode, higherstudy_program_type_id CODE, higherstudy_program_type VALUE, NULL parentCode, priority displayOrder FROM alumni2_higherstudy_program_types WHERE STATUS = 1 AND currentstatusid  = 9 UNION ALL
SELECT 'STUDY_MODE_CODE' categoryCode, higherstudy_program_mode_id CODE, higherstudy_program_mode VALUE, NULL parentCode, priority displayOrder FROM alumni2_higherstudy_program_modes WHERE STATUS = 1 UNION ALL
SELECT 'UNIVERSITY_CODE' categoryCode, uni_id CODE, uni_name VALUE, NULL parentCode, NULL displayOrder FROM tbl_university_master WHERE is_active = 1 UNION ALL
SELECT 'PREFERRED_FIELD_OF_STUDY_TYPE_CODE' categoryCode, department_id CODE, department_name VALUE, NULL parentCode, NULL displayOrder FROM lookup_department WHERE is_active = 'Y' UNION ALL
SELECT 'PREFERRED_FUNCTIONAL_AREA_CODE' categoryCode, functionalarea_id CODE, functionalarea VALUE, NULL parentCode, NULL displayOrder FROM alumni2_functionalarea WHERE STATUS = 1 UNION ALL
SELECT 'COMPANY_PREFERENCE_CODE' categoryCode, placement_companies_id CODE, company_named VALUE, NULL parentCode, NULL displayOrder FROM uni_placement_companies UNION ALL
SELECT 'YES_NO_CODE' categoryCode, 'YES' CODE, 'Yes' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'YES_NO_CODE' categoryCode, 'NO' CODE, 'No' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'GENDER_CODE' categoryCode, 'MALE' CODE, 'Male' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'GENDER_CODE' categoryCode, 'FEMALE' CODE, 'Female' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'JAN' CODE, 'January' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'FEB' CODE, 'Februery' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'MAR' CODE, 'March' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'APR' CODE, 'April' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'MAY' CODE, 'May' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'JUN' CODE, 'June' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'JUL' CODE, 'July' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'AUG' CODE, 'August' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'SEP' CODE, 'September' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'OCT' CODE, 'October' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'NOV' CODE, 'November' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'DEC' CODE, 'December' VALUE, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTAL_SOMEWHAT_NEED_HELP_TYPE_CODE' categoryCode, 'TOTALLY_CONFIDENT' CODE, 'Totally Confident' VALUE, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTAL_SOMEWHAT_NEED_HELP_TYPE_CODE' categoryCode, 'SOMEWHAT_CONFIDENT' CODE, 'Somewhat Confident' VALUE, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTAL_SOMEWHAT_NEED_HELP_TYPE_CODE' categoryCode, 'NEED_HELP_WITH_PREPARATION' CODE, 'Need Help with preparation' VALUE, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTALLY_SURE_MAY_CHAGE_CODE' categoryCode, 'TOTALLY_SURE' CODE, 'Totally Sure' VALUE, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTALLY_SURE_MAY_CHAGE_CODE' categoryCode, 'MAY_CHANGE' CODE, 'May Change' VALUE, NULL parentCode, NULL displayOrder  
