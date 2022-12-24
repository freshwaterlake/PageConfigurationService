WITH RECURSIVE 
	PastYears AS (SELECT YEAR(SYSDATE()) AS VALUE UNION ALL SELECT VALUE - 1 FROM PastYears LIMIT 50) ,
	FutureYears AS (SELECT YEAR(SYSDATE()) AS VALUE UNION ALL SELECT VALUE - 1 FROM FutureYears LIMIT 50) ,
	grade AS (SELECT 0 AS VALUE UNION ALL SELECT VALUE + 1 FROM grade LIMIT 7)
SELECT 'GRADE_A_STAR_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'A*') code,  CONCAT(VALUE, 'A*') value, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_A_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'A') code,  CONCAT(VALUE, 'A') value, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_B_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'B') code,  CONCAT(VALUE, 'B') value, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_C_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'C') code,  CONCAT(VALUE, 'C') value, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_D_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'D') code,  CONCAT(VALUE, 'D') value, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'GRADE_E_CODE' categoryCode, CONCAT(IF(VALUE=0, '', VALUE), 'E') code,  CONCAT(VALUE, 'E') value, NULL parentCode, NULL displayOrder FROM grade UNION ALL 
SELECT 'PAST_YEAR_CODE' categoryCode, VALUE code,  value, NULL parentCode, NULL displayOrder FROM PastYears UNION ALL 
SELECT 'FUTURE_YEAR_CODE' categoryCode, VALUE code,  value, NULL parentCode, NULL displayOrder FROM FutureYears UNION ALL 
SELECT 'EDUCATIONAL_OR_EMPLOYMENT_STATUS_CODE' categoryCode, current_status_id code, current_status value, NULL parentCode, priority displayOrder FROM alumni2_currentstatuses UNION ALL
SELECT 'COUNTRY_CODE' categoryCode, country_id code, country_name value, NULL parentCode, display_order displayOrder FROM tbl_country_master WHERE is_active = 'Y' UNION ALL
SELECT 'CITY_CODE' categoryCode, city_id code, city_name value, country_id parentCode, display_order displayOrder FROM tbl_city_master WHERE is_active = 'Y' UNION ALL
SELECT 'CLASS_12_CURRICULUM_CODE' categoryCode, board_id code, board_name value, board_category parentCode, NULL displayOrder FROM lookup_board UNION ALL
SELECT 'INDUSTRY_CODE' categoryCode, industry_id code, industry value, NULL parentCode, priority displayOrder FROM alumni2_industries WHERE STATUS = 1 UNION ALL
SELECT 'FUNCTIONAL_AREA_CODE' categoryCode, functionalarea_id code, functionalarea value, NULL parentCode, priority displayOrder FROM alumni2_functionalarea WHERE STATUS = 1 UNION ALL
SELECT 'SKILL_CODE' categoryCode, skill_id code, skill value, NULL parentCode, priority displayOrder FROM alumni2_skills WHERE STATUS = 1 UNION ALL
SELECT 'SKILL_LEVEL_CODE' categoryCode, skill_level_id code, skill_level value, NULL parentCode, priority displayOrder FROM alumni2_skill_levels WHERE STATUS = 1 UNION ALL
SELECT 'ACHIEVEMENT_CODE' categoryCode, achievement_type_id code, achievement_type value, NULL parentCode, priority displayOrder FROM alumni2_achievement_types WHERE STATUS = 1 UNION ALL
SELECT 'TARGET_AUDIENCE_CODE' categoryCode, member_type_id code, member_type value, NULL parentCode, priority displayOrder FROM alumni2_member_types WHERE STATUS = 1 UNION ALL
SELECT 'STUDY_PROGRAM_CODE' categoryCode, higherstudy_program_type_id code, higherstudy_program_type value, NULL parentCode, priority displayOrder FROM alumni2_higherstudy_program_types WHERE STATUS = 1 AND currentstatusid  = 9 UNION ALL
SELECT 'STUDY_MODE_CODE' categoryCode, higherstudy_program_mode_id code, higherstudy_program_mode value, NULL parentCode, priority displayOrder FROM alumni2_higherstudy_program_modes WHERE STATUS = 1 UNION ALL
SELECT 'UNIVERSITY_CODE' categoryCode, uni_id code, uni_name value, NULL parentCode, NULL displayOrder FROM tbl_university_master WHERE is_active = 1 UNION ALL
SELECT 'FIELD_OF_STUDY_TYPE_CODE' categoryCode, department_id code, department_name value, NULL parentCode, NULL displayOrder FROM lookup_department WHERE is_active = 'Y' UNION ALL
SELECT 'COMPANY_PREFERENCE_CODE' categoryCode, placement_companies_id code, company_named value, NULL parentCode, NULL displayOrder FROM uni_placement_companies UNION ALL
SELECT 'YES_NO_CODE' categoryCode, 'YES' code, 'Yes' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'YES_NO_CODE' categoryCode, 'NO' code, 'No' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'GENDER_CODE' categoryCode, 'MALE' code, 'Male' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'GENDER_CODE' categoryCode, 'FEMALE' code, 'Female' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'JAN' code, 'January' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'FEB' code, 'Februery' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'MAR' code, 'March' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'APR' code, 'April' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'MAY' code, 'May' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'JUN' code, 'June' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'JUL' code, 'July' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'AUG' code, 'August' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'SEP' code, 'September' VALUE, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'OCT' code, 'October' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'NOV' code, 'November' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'MONTH_CODE' categoryCode, 'DEC' code, 'December' value, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTAL_SOMEWHAT_NEED_HELP_TYPE_CODE' categoryCode, 'TOTALLY_CONFIDENT' code, 'Totally Confident' value, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTAL_SOMEWHAT_NEED_HELP_TYPE_CODE' categoryCode, 'SOMEWHAT_CONFIDENT' code, 'Somewhat Confident' value, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTAL_SOMEWHAT_NEED_HELP_TYPE_CODE' categoryCode, 'NEED_HELP_WITH_PREPARATION' code, 'Need Help with preparation' value, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTALLY_SURE_MAY_CHAGE_CODE' categoryCode, 'TOTALLY_SURE' code, 'Totally Sure' value, NULL parentCode, NULL displayOrder  UNION ALL
SELECT 'TOTALLY_SURE_MAY_CHAGE_CODE' categoryCode, 'MAY_CHANGE' code, 'May Change' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'COMPANY_CODE' categoryCode, 'MICROSOFT' code, 'Microsoft' value, NULL parentCode, NULL displayOrder UNION ALL
SELECT 'COMPANY_CODE' categoryCode, 'GOOGLE' code, 'Google' value, NULL parentCode, NULL displayOrder
