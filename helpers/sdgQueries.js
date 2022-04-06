const sdgQueries = {
    sdg1: "TITLE-ABS-KEY%20(%20(%20%7Bextreme%20poverty%7D%20%20OR%20%20%7Bpoverty%20alleviation%7D%20%20OR%20%20%7Bpoverty%20eradication%7D%20%20OR%20%20%7Bpoverty%20reduction%7D%20%20OR%20%20%7Binternational%20poverty%20line%7D%20%20OR%20%20(%20%7Bfinancial%20aid%7D%20%20AND%20%20%7Bpoverty%7D%20)%20%20OR%20%20(%20%7Bfinancial%20aid%7D%20%20AND%20%20%7Bpoor%7D%20)%20%20OR%20%20(%20%7Bfinancial%20aid%7D%20%20AND%20%20%7Bnorth-south%20divide%7D%20)%20%20OR%20%20(%20%7Bfinancial%20development%7D%20%20AND%20%20%7Bpoverty%7D%20)%20%20OR%20%20%7Bfinancial%20empowerment%7D%20%20OR%20%20%7Bdistributional%20effect%7D%20%20OR%20%20%7Bdistributional%20effects%7D%20%20OR%20%20%7Bchild%20labor%7D%20%20OR%20%20%7Bchild%20labour%7D%20%20OR%20%20%7Bdevelopment%20aid%7D%20%20OR%20%20%7Bsocial%20protection%7D%20%20OR%20%20%7Bsocial%20protection%20system%7D%20%20OR%20%20(%20%7Bsocial%20protection%7D%20%20AND%20%20access%20)%20%20OR%20%20microfinanc*%20%20OR%20%20micro-financ*%20%20OR%20%20%7Bresilience%20of%20the%20poor%7D%20%20OR%20%20(%20%7Bsafety%20net%7D%20%20AND%20%20%7Bpoor%7D%20%20OR%20%20%7Bvulnerable%7D%20)%20%20OR%20%20(%20%7Beconomic%20resource%7D%20%20AND%20%20access%20)%20%20OR%20%20(%20%7Beconomic%20resources%7D%20%20AND%20%20access%20)%20%20OR%20%20%7Bfood%20bank%7D%20%20OR%20%20%7Bfood%20banks%7D%20)%20)",
    sdg2: "TITLE-ABS-KEY%20(%20(%20%7Bland%20tenure%20rights%7D%20%20OR%20%20(%20smallholder%20%20AND%20%20(%20farm%20%20OR%20%20forestry%20%20OR%20%20pastoral%20%20OR%20%20agriculture%20%20OR%20%20fishery%20%20OR%20%20%7Bfood%20producer%7D%20%20OR%20%20%7Bfood%20producers%7D%20)%20)%20%20OR%20%20malnourish*%20%20OR%20%20malnutrition%20%20OR%20%20undernourish*%20%20OR%20%20%7Bundernutrition%7D%20%20OR%20%20%7Bagricultural%20production%7D%20%20OR%20%20%7Bagricultural%20productivity%7D%20%20OR%20%20%7Bagricultural%20practices%7D%20%20OR%20%20%7Bagricultural%20management%7D%20%20OR%20%20%7Bfood%20production%7D%20%20OR%20%20%7Bfood%20productivity%7D%20%20OR%20%20%7Bfood%20security%7D%20%20OR%20%20%7Bfood%20insecurity%7D%20%20OR%20%20%7Bland%20right%7D%20%20OR%20%20%7Bland%20rights%7D%20%20OR%20%20%7Bland%20reform%7D%20%20OR%20%20%7Bland%20reforms%7D%20%20OR%20%20%7Bresilient%20agricultural%20practices%7D%20%20OR%20%20(%20agriculture%20%20AND%20%20potassium%20)%20%20OR%20%20fertili%3Fer%20%20OR%20%20%7Bfood%20nutrition%20improvement%7D%20%20OR%20%20%7Bhidden%20hunger%7D%20%20OR%20%20%7Bgenetically%20modified%20food%7D%20%20OR%20%20(%20gmo%20%20AND%20%20food%20)%20%20OR%20%20%7Bagroforestry%20practices%7D%20%20OR%20%20%7Bagroforestry%20management%7D%20%20OR%20%20%7Bagricultural%20innovation%7D%20%20OR%20%20(%20%7Bfood%20security%7D%20%20AND%20%20%7Bgenetic%20diversity%7D%20)%20%20OR%20%20(%20%7Bfood%20market%7D%20%20AND%20%20(%20restriction%20%20OR%20%20tariff%20%20OR%20%20access%20%20OR%20%20%7Bnorth%20south%20divide%7D%20%20OR%20%20%7Bdevelopment%20governance%7D%20)%20)%20%20OR%20%20%7Bfood%20governance%7D%20%20OR%20%20%7Bfood%20supply%20chain%7D%20%20OR%20%20%7Bfood%20value%20chain%7D%20%20OR%20%20%7Bfood%20commodity%20market%7D%20%20AND%20NOT%20%20%7Bdisease%7D%20)%20)",
    sdg3: "TITLE-ABS-KEY%20(%20(%20(%20human%20AND%20(%20health*%20OR%20disease*%20OR%20illness*%20OR%20medicine*%20OR%20mortality%20)%20)%20OR%20%7Bbattered%20child%20syndrome%7D%20OR%20%7Bcardiovascular%20disease%7D%20OR%20%7Bcardiovascular%20diseases%7D%20OR%20%7Bchagas%7D%20OR%20%7Bchild%20abuse%7D%20OR%20%7Bchild%20neglect%7D%20OR%20%7Bchild%20well-being%20index%7D%20OR%20%7Byouth%20well-being%20index%7D%20OR%20%7Bchild%20wellbeing%20index%7D%20OR%20%7Byouth%20wellbeing%20index%7D%20OR%20%7Bwater-borne%20disease%7D%20OR%20%7Bwater-borne%20diseases%7D%20OR%20%7Bwater%20borne%20disease%7D%20OR%20%7Bwater%20borne%20diseases%7D%20OR%20%7Btropical%20disease%7D%20OR%20%7Btropical%20diseases%7D%20OR%20%7Bchronic%20respiratory%20disease%7D%20OR%20%7Bchronic%20respiratory%20diseases%7D%20OR%20%7Binfectious%20disease%7D%20OR%20%7Binfectious%20diseases%7D%20OR%20%7Bsexually-transmitted%20disease%7D%20OR%20%7Bsexually%20transmitted%20disease%7D%20OR%20%7Bsexually-transmitted%20diseases%7D%20OR%20%7Bsexually%20transmitted%20diseases%7D%20OR%20%7Bcommunicable%20disease%7D%20OR%20%7Bcommunicable%20diseases%7D%20OR%20aids%20OR%20hiv%20OR%20%7Bhuman%20immunodeficiency%20virus%7D%20OR%20tuberculosis%20OR%20malaria%20OR%20hepatitis%20OR%20polio*%20OR%20vaccin*%20OR%20cancer*%20OR%20diabet*%20OR%20%7Bmaternal%20mortality%7D%20OR%20%7Bchild%20mortality%7D%20OR%20%7Bchildbirth%20complications%7D%20OR%20%7Bneonatal%20mortality%7D%20OR%20%7Bneo-natal%20mortality%7D%20OR%20%7Bpremature%20mortality%7D%20OR%20%7Binfant%20mortality%7D%20OR%20%7Bquality%20adjusted%20life%20year%7D%20OR%20%7Bmaternal%20health%7D%20OR%20%7Bpreventable%20death%7D%20OR%20%7Bpreventable%20deaths%7D%20OR%20%7Btobacco%20control%7D%20OR%20%7Bsubstance%20abuse%7D%20OR%20%7Bdrug%20abuse%7D%20OR%20%7Btobacco%20use%7D%20OR%20%7Balcohol%20use%7D%20OR%20%7Bsubstance%20addiction%7D%20OR%20%7Bdrug%20addiction%7D%20OR%20%7Btobacco%20addiction%7D%20OR%20alcoholism%20OR%20suicid*%20OR%20%7Bpostnatal%20depression%7D%20OR%20%7Bpost-natal%20depression%7D%20OR%20%7Bzika%20virus%7D%20OR%20dengue%20OR%20schistosomiasis%20OR%20%7Bsleeping%20sickness%7D%20OR%20ebola%20OR%20%7Bmental%20health%7D%20OR%20%7Bmental%20disorder%7D%20OR%20%7Bmental%20illness%7D%20OR%20%7Bmental%20illnesses%7D%20OR%20%7Bmeasles%7D%20OR%20%7Bneglected%20disease%7D%20OR%20%7Bneglected%20diseases%7D%20OR%20diarrhea%20OR%20diarrhoea%20OR%20cholera%20OR%20dysentery%20OR%20%7Btyphoid%20fever%7D%20OR%20%7Btraffic%20accident%7D%20OR%20%7Btraffic%20accidents%7D%20OR%20%7Bhealthy%20lifestyle%7D%20OR%20%7Blife%20expectancy%7D%20OR%20%7Blife%20expectancies%7D%20OR%20%7Bhealth%20policy%7D%20OR%20(%20%7Bhealth%20system%7D%20AND%20(%20access%20OR%20accessible%20)%20)%20OR%20%7Bhealth%20risk%7D%20OR%20%7Bhealth%20risks%7D%20OR%20%7Binclusive%20health%7D%20OR%20obesity%20OR%20%7Bsocial%20determinants%20of%20health%7D%20OR%20%7Bpsychological%20harm%7D%20OR%20%7Bpsychological%20wellbeing%7D%20OR%20%7Bpsychological%20well-being%7D%20OR%20%7Bpsychological%20well%20being%7D%20OR%20%7Bpublic%20health%7D%20)%20)",
    sdg4: "TITLE-ABS-KEY%20(%20(%20school%20%20OR%20%20education%20%20OR%20%20educational%20)%20%20AND%20%20(%20%7Bschool%20attendance%7D%20%20OR%20%20%7Bschool%20enrollment%7D%20%20OR%20%20%7Bschool%20enrolment%7D%20%20OR%20%20%7Binclusive%20education%7D%20%20OR%20%20%7Beducational%20inequality%7D%20%20OR%20%20%7Beducation%20quality%7D%20%20OR%20%20%7Beducational%20enrolment%7D%20%20OR%20%20%7Beducational%20enrollment%7D%20%20OR%20%20%7Badult%20literacy%7D%20%20OR%20%20%7Bnumeracy%20rate%7D%20%20OR%20%20%7Beducational%20environment%7D%20%20OR%20%20%7Beducational%20access%7D%20%20OR%20%20(%20%7Bdevelopment%20aid%7D%20%20AND%20%20%7Bteacher%20training%7D%20)%20%20OR%20%20%7Bearly%20childhood%20education%7D%20%20OR%20%20%7Bbasic%20education%7D%20%20OR%20%20%7Baffordable%20education%7D%20%20OR%20%20%7Beducational%20financial%20aid%7D%20%20OR%20%20%7Bschool%20safety%7D%20%20OR%20%20%7Bsafety%20in%20school%7D%20%20OR%20%20(%20%7Blearning%20opportunities%7D%20%20AND%20%20(%20%7Bgender%20disparities%7D%20%20OR%20%20empowerment%20)%20)%20%20OR%20%20(%20%7Blearning%20opportunity%7D%20%20AND%20%20(%20%7Bgender%20disparities%7D%20%20OR%20%20empowerment%20)%20)%20%20OR%20%20%7Byouth%20empowerment%7D%20%20OR%20%20%7Bwomen%20empowerment%7D%20%20OR%20%20%7Bequal%20opportunities%7D%20%20OR%20%20%7Bchild%20labour%7D%20%20OR%20%20%7Bchild%20labor%7D%20%20OR%20%20%7Bdiscriminatory%7D%20%20OR%20%20%7Beducational%20inequality%7D%20%20OR%20%20%7Beducational%20gap%7D%20%20OR%20%20(%20%7Bpoverty%20trap%7D%20%20AND%20%20%7Bschooling%7D%20)%20%20OR%20%20%7Bspecial%20education%20needs%7D%20%20OR%20%20%7Binclusive%20education%20system%7D%20%20OR%20%20(%20%7Bschooling%7D%20%20AND%20%20(%20%7Bgender%20disparities%7D%20%20OR%20%20%7Bethnic%20disparities%7D%20%20OR%20%20%7Bracial%20disparities%7D%20)%20)%20%20OR%20%20%7Beducation%20exclusion%7D%20%20OR%20%20%7Beducation%20dropouts%7D%20%20OR%20%20%7Bglobal%20citizenship%7D%20%20OR%20%20%7Bsustainable%20development%20education%7D%20%20OR%20%20%7Benvironmental%20education%7D%20%20OR%20%20%7Beducation%20policy%7D%20%20OR%20%20%7Beducational%20policies%7D%20%20OR%20%20%7Binternational%20education%7D%20%20OR%20%20%7Beducation%20reform%7D%20%20OR%20%20(%20%7Beducational%20reform%7D%20%20AND%20%20%7Bdeveloping%20countries%7D%20)%20%20OR%20%20%7Beducational%20governance%7D%20%20OR%20%20(%20%7Bdeveloping%20countries%7D%20%20AND%20%20%7Bschool%20effects%7D%20)%20%20OR%20%20%7Beducation%20expenditure%7D%20%20OR%20%20%7Bforeign%20aid%7D%20%20OR%20%20(%20%7Bteacher%20training%7D%20%20AND%20%20%7Bdeveloping%20countries%7D%20)%20%20OR%20%20%7Bteacher%20attrition%7D%20)%20%20AND%20NOT%20%20%7Bhealth%20literacy%7D%20)",
    sdg5: "TITLE-ABS-KEY%20(%20(%20%7Bgender%20inequality%7D%20OR%20%7Bgender%20equality%7D%20OR%20%7Bemployment%20equity%7D%20OR%20%7Bgender%20wage%20gap%7D%20OR%20%7Bfemale%20labor%20force%20participation%7D%20OR%20%7Bfemale%20labour%20force%20participation%7D%20OR%20%7Bwomen%20labor%20force%20participation%7D%20OR%20%7Bwomen%20labour%20force%20participation%7D%20OR%20%7Bwomens'%20employment%7D%20OR%20%7Bfemale%20employment%7D%20OR%20%7Bwomen's%20unemployment%7D%20OR%20%7Bfemale%20unemployment%7D%20OR%20(%20access%20AND%20%7Bfamily%20planning%20services%7D%20)%20OR%20%7Bforced%20marriage%7D%20OR%20%7Bchild%20marriage%7D%20OR%20%7Bforced%20marriages%7D%20OR%20%7Bchild%20marriages%7D%20OR%20%7Boccupational%20segregation%7D%20OR%20%7Bwomen's%20empowerment%7D%20OR%20%7Bgirls'%20empowerment%7D%20OR%20%7Bfemale%20empowerment%7D%20OR%20%7Bfemale%20genital%20mutilation%7D%20OR%20%7Bfemale%20genital%20cutting%7D%20OR%20%7Bdomestic%20violence%7D%20OR%20%7Bwomen%20AND%20violence%7D%20OR%20%7Bgirl*%20AND%20violence%7D%20OR%20%7Bsexual%20violence%7D%20OR%20(%20%7Bunpaid%20work%7D%20AND%20%7Bgender%20inequality%7D%20)%20OR%20(%20%7Bunpaid%20care%20work%7D%20AND%20%7Bgender%20inequality%7D%20)%20OR%20%7Bwomen's%20political%20participation%7D%20OR%20%7Bfemale%20political%20participation%7D%20OR%20%7Bfemale%20managers%7D%20OR%20%7Bwomen%20in%20leadership%7D%20OR%20%7Bfemale%20leadership%7D%20OR%20%7Bintra-household%20allocation%7D%20OR%20(%20access%20AND%20%7Breproductive%20healthcare%7D%20)%20OR%20%7Bhonour%20killing%7D%20OR%20%7Bhonor%20killing%7D%20OR%20%7Bhonour%20killings%7D%20OR%20%7Bhonor%20killings%7D%20OR%20%7Bantiwomen%7D%20OR%20%7Banti-women%7D%20OR%20%7Bfeminism%7D%20OR%20%7Bmisogyny%7D%20OR%20%7Bfemale%20infanticide%7D%20OR%20%7Bfemale%20infanticides%7D%20OR%20%7Bhuman%20trafficking%7D%20OR%20%7Bforced%20prostitution%7D%20OR%20(%20equality%20AND%20(%20%7Bsexual%20rights%7D%20OR%20%7Breproductive%20rights%7D%20OR%20%7Bdivorce%20rights%7D%20)%20)%20OR%20%7Bwomen's%20rights%7D%20OR%20%7Bgender%20injustice%7D%20OR%20%7Bgender%20injustices%7D%20OR%20%7Bgender%20discrimination%7D%20OR%20%7Bgender%20disparities%7D%20OR%20%7Bgender%20gap%7D%20OR%20%7Bfemale%20exploitation%7D%20OR%20%7Bhousehold%20equity%7D%20OR%20%7Bfemale%20political%20participation%7D%20OR%20%7Bwomen's%20underrepresentation%7D%20OR%20%7Bfemale%20entrepreneurship%7D%20OR%20%7Bfemale%20ownership%7D%20OR%20%7Bwomen's%20economic%20development%7D%20OR%20%7Bwomen's%20power%7D%20OR%20%7Bgender-responsive%20budgeting%7D%20OR%20%7Bgender%20quota%7D%20OR%20(%20%7Bforeign%20aid%7D%20AND%20%7Bwomen's%20empowerment%7D%20)%20OR%20%7Bgender%20segregation%7D%20OR%20%7Bgender-based%20violence%7D%20OR%20%7Bgender%20participation%7D%20OR%20%7Bfemale%20politician%7D%20OR%20%7Bfemale%20leader%7D%20OR%20%7Bcontraceptive%20behaviour%7D%20OR%20%7Bwomen's%20autonomy%7D%20OR%20%7Bagrarian%20feminism%7D%20OR%20%7Bmicrofinance%7D%20OR%20%7Bwomen's%20livelihood%7D%20OR%20%7Bwomen's%20ownership%7D%20OR%20%7Bfemale%20smallholder%7D%20OR%20%7Bgender%20mainstreaming%7D%20)%20)",
    sdg6: "TITLE-ABS-KEY%20(%20(%20(%20(%20%7BSafe%7D%20AND%20(%20%7Bwater%20access%7D%20OR%20%7Bdrinking%20water%7D%20)%20)%20OR%20(%20%7Bclean%7D%20AND%20(%20%7Bdrinking%20water%7D%20OR%20%7Bwater%20source%7D%20)%20)%20OR%20(%20%7Bwater%7D%20AND%20(%20%7Bsanitation%20and%20hygiene%7D%20OR%20%7Bsanitation%20%26%20hygiene%7D%20OR%20%7Bquality%7D%20OR%20%7Bresource%7D%20)%20AND%20(%20%7Bwater%20availability%7D%20OR%20%7Bwater-use%20efficiency%7D%20OR%20%7Bwater%20supply%7D%20OR%20%7Bwater%20supplies%7D%20OR%20%7Bclean%20water%7D%20OR%20%7Bhygienic%20toilet%7D%20OR%20%7Bhygienic%20toilets%7D%20OR%20%7Bantifouling%20membrane%7D%20OR%20%7Bantifouling%20membranes%7D%20OR%20%7Banti-fouling%20membrane%7D%20OR%20%7Banti-fouling%20membranes%7D%20OR%20%7Bwater%20management%7D%20OR%20%7Baquatic%20toxicology%7D%20OR%20%7Bwater%20toxicology%7D%20OR%20%7Baquatic%20ecotoxicology%7D%20OR%20%7Bwater%20ecotoxicology%7D%20)%20)%20OR%20(%20(%20%7Bfreshwater%7D%20OR%20%7Bfresh%20water%7D%20)%20AND%20(%20%7Bwater%20quality%7D%20)%20AND%20(%20%7Bpollutant%7D%20OR%20%7Bpollution%7D%20OR%20contamina*%20)%20)%20OR%20(%20%7Bfreshwater%7D%20AND%20(%20%7Bwater%20security%7D%20OR%20%7Bwater%20shortage%7D%20OR%20(%7Bwaste%20water%7D%20AND%20%E2%80%9Ctreatment%E2%80%9D)%20OR%20(%7Bwastewater%7D%20AND%20%E2%80%9Ctreatment%E2%80%9D)%20OR%20%7Bwater%20conservation%7D%20OR%20%7Bwater%20footprint%7D%20OR%20%7Bwater%20infrastructure%7D%20OR%20%7Bwater%20pollution%7D%20OR%20%7Bwater%20purification%7D%20OR%20%7Bwater%20use%7D%20OR%20%7Bwater%20uses%7D%20OR%20sanit*%20OR%20sewer*%20)%20)%20OR%20(%20(%20%7Bwater%7D%20AND%20(%20%7Becosystem%7D%20OR%20%7Beco-system%7D%20)%20AND%20(%20%7Bprotection%20of%7D%20OR%20%7Bendocrine%20disruptor%7D%20OR%20%7Bendocrine%20disruptors%7D%20)%20)%20AND%20NOT%20%7Bmarine%7D%20)%20OR%20(%7Bwater%7D%20AND%20%7Bwater%20management%7D%20AND%20(%7Bpollution%20remediation%7D%20OR%20%7Bpollutant%20removal%7D))%20OR%20((%7Bgroundwater%7D%20OR%20%7Bground%20water%7D%20OR%20%7Bground-water%7D)%20AND%20%7Bfreshwater%7D)%20OR%20((%7Bwater%20pollution%7D%20OR%20%7Bwater%20pollutant%7D)%20AND%20(%7Bwaste%20water%7D%20AND%20%E2%80%9Ctreatment%E2%80%9D)%20OR%20(%7Bwastewater%7D%20AND%20%E2%80%9Ctreatment%E2%80%9D))%20OR%20%7Bfreshwater%20availability%7D%20OR%20%7Bfresh%20water%20availability%7D%20OR%20%7Bwater%20scarcity%7D%20OR%20%7Bopen%20defecation%7D%20OR%20%7Bblue%20water%7D%20OR%20%7Bgreen%20water%7D%20OR%20%7Bgrey%20water%7D%20OR%20%7Bblack%20water%7D%20)%20)%20AND%20NOT%20%7Bglobal%20burden%20of%20disease%20study%7D%20)",
    sdg7: "TITLE-ABS-KEY%20(%20(%20%7Benergy%20efficiency%7D%20%20OR%20%20%7Benergy%20consumption%7D%20%20OR%20%20%7Benergy%20transition%7D%20%20OR%20%20%7Bclean%20energy%20technology%7D%20%20OR%20%20%7Benergy%20equity%7D%20%20OR%20%20%7Benergy%20justice%7D%20%20OR%20%20%7Benergy%20poverty%7D%20%20OR%20%20%7Benergy%20policy%7D%20%20OR%20%20renewable*%20%20OR%20%20%7B2000%20Watt%20society%7D%20%20OR%20%20%7Bsmart%20micro-grid%7D%20%20OR%20%20%7Bsmart%20grid%7D%20%20OR%20%20%7Bsmart%20microgrid%7D%20%20OR%20%20%7Bsmart%20micro-grids%7D%20%20OR%20%20%7Bsmart%20grids%7D%20%20OR%20%20%7Bsmart%20microgrids%7D%20%20OR%20%20%7Bsmart%20meter%7D%20%20OR%20%20%7Bsmart%20meters%7D%20%20OR%20%20%7Baffordable%20electricity%7D%20%20OR%20%20%7Belectricity%20consumption%7D%20%20OR%20%20%7Breliable%20electricity%7D%20%20OR%20%20%7Bclean%20fuel%7D%20%20OR%20%20%7Bclean%20cooking%20fuel%7D%20%20OR%20%20%7Bfuel%20poverty%7D%20%20OR%20%20energiewende%20%20OR%20%20%7Blife-cycle%20assessment%7D%20%20OR%20%20%7Blife%20cycle%20assessment%7D%20%20OR%20%20%7Blife-cycle%20assessments%7D%20%20OR%20%20%7Blife%20cycle%20assessments%7D%20%20OR%20%20(%20%7Bphotochemistry%7D%20%20AND%20%20%7Brenewable%20energy%7D%20)%20%20OR%20%20photovoltaic%20%20OR%20%20%7Bphotocatalytic%20water%20splitting%7D%20%20OR%20%20%7Bhydrogen%20production%7D%20%20OR%20%20%7Bwater%20splitting%7D%20%20OR%20%20%7Blithium-ion%20batteries%7D%20%20OR%20%20%7Blithium-ion%20battery%7D%20%20OR%20%20%7Bheat%20network%7D%20%20OR%20%20%7Bdistrict%20heat%7D%20%20OR%20%20%7Bdistrict%20heating%7D%20%20OR%20%20%7Bresidential%20energy%20consumption%7D%20%20OR%20%20%7Bdomestic%20energy%20consumption%7D%20%20OR%20%20%7Benergy%20security%7D%20%20OR%20%20%7Brural%20electrification%7D%20%20OR%20%20%7Benergy%20ladder%7D%20%20OR%20%20%7Benergy%20access%7D%20%20OR%20%20%7Benergy%20conservation%7D%20%20OR%20%20%7Blow-carbon%20society%7D%20%20OR%20%20%7Bhybrid%20renewable%20energy%20system%7D%20%20OR%20%20%7Bhybrid%20renewable%20energy%20systems%7D%20%20OR%20%20%7Bfuel%20switching%7D%20%20OR%20%20(%20%7Bforeign%20development%20aid%7D%20%20AND%20%20%7Brenewable%20energy%7D%20)%20%20OR%20%20%7Benergy%20governance%7D%20%20OR%20%20(%20%7Bofficial%20development%20assistance%7D%20%20AND%20%20%7Belectricity%7D%20)%20%20OR%20%20(%20%7Benergy%20development%7D%20%20AND%20%20%7Bdeveloping%20countries%7D%20)%20)%20%20AND%20NOT%20%20(%20%7Bwireless%20sensor%20network%7D%20%20OR%20%20%7Bwireless%20sensor%20networks%7D%20)%20)",
    sdg8: "TITLE-ABS-KEY%20(%20(%20%7Beconomic%20growth%7D%20%20OR%20%20%7Beconomic%20development%20policy%7D%20%20OR%20%20%7Bemployment%20policy%7D%20%20OR%20%20%7Binclusive%20economic%20growth%7D%20%20OR%20%20%7Bsustainable%20growth%7D%20%20OR%20%20%7Beconomic%20development%7D%20%20OR%20%20%7Beconomic%20globalization%7D%20%20OR%20%20%7Beconomic%20globalisation%7D%20%20OR%20%20%7Beconomic%20productivity%7D%20%20OR%20%20%7Blow-carbon%20economy%7D%20%20OR%20%20%7Binclusive%20growth%7D%20%20OR%20%20microfinanc*%20%20OR%20%20micro-financ*%20%20OR%20%20micro-credit*%20%20OR%20%20microcredit*%20%20OR%20%20%7Bequal%20income%7D%20%20OR%20%20%7Bequal%20wages%7D%20%20OR%20%20%7Bdecent%20job%7D%20%20OR%20%20%7Bdecent%20jobs%7D%20%20OR%20%20%7Bquality%20job%7D%20%20OR%20%20%7Bquality%20jobs%7D%20%20OR%20%20%7Bjob%20creation%7D%20%20OR%20%20%7Bfull%20employment%7D%20%20OR%20%20%7Bemployment%20protection%7D%20%20OR%20%20%7Binformal%20employment%7D%20%20OR%20%20%7Bprecarious%20employment%7D%20%20OR%20%20%7Bunemployment%7D%20%20OR%20%20%7Bprecarious%20job%7D%20%20OR%20%20%7Bprecarious%20jobs%7D%20%20OR%20%20microenterprise*%20%20OR%20%20micro-enterprise*%20%20OR%20%20%7Bsmall%20enterprise%7D%20%20OR%20%20%7Bmedium%20enterprise%7D%20%20OR%20%20%7Bsmall%20enterprises%7D%20%20OR%20%20%7Bmedium%20enterprises%7D%20%20OR%20%20%7Bsmall%20entrepreneur%7D%20%20OR%20%20%7Bstarting%20entrepreneur%7D%20%20OR%20%20%7Bmedium%20entrepreneur%7D%20%20OR%20%20%7Bsmall%20entrepreneurs%7D%20%20OR%20%20%7Bmedium%20entrepreneurs%7D%20%20OR%20%20%7Bstarting%20entrepreneurs%7D%20%20OR%20%20%7Bsocial%20entrepreneurship%7D%20%20OR%20%20%7Bsafe%20working%20environment%7D%20%20OR%20%20%7Blabor%20market%20institution%7D%20%20OR%20%20%7Blabor%20market%20institutions%7D%20%20OR%20%20%7Blabour%20market%20institution%7D%20%20OR%20%20%7Blabour%20market%20institutions%7D%20%20OR%20%20%7Bforced%20labour%7D%20%20OR%20%20%7Bforced%20labor%7D%20%20OR%20%20%7Bchild%20labour%7D%20%20OR%20%20%7Bchild%20labor%7D%20%20OR%20%20%7Blabour%20right%7D%20%20OR%20%20%7Blabor%20right%7D%20%20OR%20%20%7Blabour%20rights%7D%20%20OR%20%20%7Blabor%20rights%7D%20%20OR%20%20%7Bmodern%20slavery%7D%20%20OR%20%20%7Bhuman%20trafficking%7D%20%20OR%20%20%7Bchild%20soldier%7D%20%20OR%20%20%7Bchild%20soldiers%7D%20%20OR%20%20%7Bglobal%20jobs%7D%20%20OR%20%20%7Bliving%20wage%7D%20%20OR%20%20%7Bminimum%20wage%7D%20%20OR%20%20%7Bcircular%20economy%7D%20%20OR%20%20%7Binclusive%20economy%7D%20%20OR%20%20%7Brural%20economy%7D%20%20OR%20%20%7BForeign%20Development%20Investment%7D%20%20OR%20%20%7BAid%20for%20Trade%7D%20%20OR%20%20%7Btrade%20unions%7D%20%20OR%20%20%7Btrade%20union%7D%20%20OR%20%20%7Bworking%20poor%7D%20%20OR%20%20%7BNot%20in%20Education%2C%20Employment%2C%20or%20Training%7D%20%20OR%20%20%7Bcarbon%20offset%7D%20%20OR%20%20%7Bcarbon%20offsetting%7D%20%20OR%20%20%7Bcarbon%20offsets%7D%20%20OR%20%20%7Boffset%20project%7D%20%20OR%20%20%7Boffset%20projects%7D%20%20OR%20%20%7Beconomic%20diversification%7D%20%20OR%20%20%7Bmaterial%20footprint%7D%20%20OR%20%20%7Bresource%20efficiency%7D%20%20OR%20%20(%20%7Bcradle%20to%20cradle%7D%20%20AND%20%20%7Beconomy%7D%20)%20%20OR%20%20%7Beconomic%20decoupling%7D%20%20OR%20%20%7Blabour%20market%20disparities%7D%20%20OR%20%20%7Bsustainable%20tourism%7D%20%20OR%20%20%7Becotourism%7D%20%20OR%20%20%7Bcommunity-based%20tourism%7D%20%20OR%20%20%7Btourism%20employment%7D%20%20OR%20%20%7Bsustainable%20tourism%20policy%7D%20%20OR%20%20%7Bfinancial%20access%7D%20%20OR%20%20%7Bfinancial%20inclusion%7D%20%20OR%20%20%7Baccess%20to%20banking%7D%20)%20%20AND%20NOT%20%20%7Bhealth%7D%20)",
    sdg9: "TITLE-ABS-KEY%20(%20(%20%7Bindustrial%20growth%7D%20%20OR%20%20%7Bindustrial%20diversification%7D%20%20OR%20%20%7Binfrastructural%20development%7D%20%20OR%20%20%7Binfrastructural%20investment%7D%20%20OR%20%20%7Binfrastructure%20investment%7D%20%20OR%20%20%7Bpublic%20infrastructure%7D%20%20OR%20%20%7Bresilient%20infrastructure%7D%20%20OR%20%20%7Btransborder%20infrastructure%7D%20%20OR%20%20%7Bpublic%20infrastructures%7D%20%20OR%20%20%7Bresilient%20infrastructures%7D%20%20OR%20%20%7Btransborder%20infrastructures%7D%20%20OR%20%20(%20%7Bindustrial%20emissions%7D%20%20AND%20%20mitigation%20)%20%20OR%20%20%7Bindustrial%20waste%20management%7D%20%20OR%20%20%7Bindustrial%20waste%20treatment%7D%20%20OR%20%20%7Btraffic%20congestion%7D%20%20OR%20%20microenterprise*%20%20OR%20%20micro-enterprise*%20%20OR%20%20%7Bsmall%20enterprise%7D%20%20OR%20%20%7Bmedium%20enterprise%7D%20%20OR%20%20%7Bsmall%20enterprises%7D%20%20OR%20%20%7Bmedium%20enterprises%7D%20%20OR%20%20%7Bsmall%20entrepreneur%7D%20%20OR%20%20%7Bmedium%20entrepreneur%7D%20%20OR%20%20%7Bsmall%20entrepreneurs%7D%20%20OR%20%20%7Bmedium%20entrepreneurs%7D%20%20OR%20%20%7Bvalue%20chain%20management%7D%20%20OR%20%20(%20%7Bbroadband%20access%7D%20%20AND%20%20%7Bdeveloping%20countries%7D%20)%20%20OR%20%20%7Bmanufacturing%20innovation%7D%20%20OR%20%20%7Bmanufacturing%20investment%7D%20%20OR%20%20%7Bsustainable%20transportation%7D%20%20OR%20%20%7Baccessible%20transportation%7D%20%20OR%20%20%7Btransportation%20services%7D%20%20OR%20%20%7Binclusive%20transportation%7D%20%20OR%20%20%7BR%26D%20investment%7D%20%20OR%20%20%7Bgreen%20product%7D%20%20OR%20%20%7Bgreen%20products%7D%20%20OR%20%20%7Bsustainable%20manufacturing%7D%20%20OR%20%20(%20%7Bcradle%20to%20cradle%7D%20%20AND%20%20industry%20)%20%20OR%20%20%7Bclosed%20loop%20supply%20chain%7D%20%20OR%20%20(%20industrial%20%20AND%20innovation%20)%20%20OR%20%20%7Bprocess%20innovation%7D%20%20OR%20%20%7Bproduct%20innovation%7D%20%20OR%20%20%7Binclusive%20innovation%7D%20)%20)",
    sdg10: "TITLE-ABS-KEY%20(%20(%20(%20equality%20%20AND%20%20(%20economic%20%20OR%20%20financial%20%20OR%20%20socio-economic%20)%20)%20%20OR%20%20(%20inequality%20%20AND%20%20(%20economic%20%20OR%20%20financial%20%20OR%20%20socio-economic%20)%20)%20%20OR%20%20%7Beconomic%20reform%20policy%7D%20%20OR%20%20%7Beconomic%20reform%20policies%7D%20%20OR%20%20%7Bpolitical%20inclusion%7D%20%20OR%20%20%7Bsocial%20protection%20policy%7D%20%20OR%20%20%7Bsocial%20protection%20policies%7D%20%20OR%20%20(%20immigration%20%20AND%20NOT%20%20(%20chemistry%20%20OR%20%20disease%20%20OR%20%20biodiversity%20)%20)%20%20OR%20%20(%20emigration%20%20AND%20NOT%20%20(%20chemistry%20%20OR%20%20disease%20%20OR%20%20biodiversity%20)%20)%20%20OR%20%20%7Bforeign%20direct%20investment%7D%20%20OR%20%20%7Bdevelopment%20gap%7D%20%20OR%20%20%7Bdevelopment%20gaps%7D%20%20OR%20%20%7Bmigrant%20remittance%7D%20%20OR%20%20%7Bresponsible%20migration%7D%20%20OR%20%20%7Bmigration%20policy%7D%20%20OR%20%20%7Bmigration%20policies%7D%20%20OR%20%20%7Bnorth-south%20divide%7D%20%20OR%20%20(%20developing%20%20AND%20%20(%20%7Btariffs%7D%20%20OR%20%20%7Btariff%7D%20%20OR%20%20%7Bzero-tariff%7D%20%20OR%20%20%7Bduty-free%20access%7D%20)%20)%20%20OR%20%20%7Bsocial%20exclusion%7D%20%20OR%20%20%7Beconomic%20marginali%3Fation%7D%20%20OR%20%20%7Bincome%20inequality%7D%20%20OR%20%20%7Bdiscriminatory%20law*%7D%20%20OR%20%20%7Bdiscriminatory%20policies%7D%20%20OR%20%20%7Bdiscriminatory%20policy%7D%20%20OR%20%20%7Beconomic%20empowerment%7D%20%20OR%20%20%7Beconomic%20transformation%7D%20%20OR%20%20(%20%7Bglobal%20market%7D%20%20AND%20%20%7Bempowerment%7D%20)%20)%20)",
    sdg11: "TITLE-ABS-KEY%20(%20(%20city%20%20OR%20%20cities%20%20OR%20%20%7Bhuman%20settlement%7D%20%20OR%20%20%7Bhuman%20settlements%7D%20%20OR%20%20urban%20%20OR%20%20metropoli*%20%20OR%20%20town*%20%20OR%20%20municipal*%20)%20%20AND%20%20(%20gentrification%20%20OR%20%20congestion%20%20OR%20%20transportation%20%20OR%20%20%7Bpublic%20transport%7D%20%20OR%20%20housing%20%20OR%20%20slum*%20%20OR%20%20%7Bsendai%20framework%7D%20%20OR%20%20%7BDisaster%20Risk%20Reduction%7D%20%20OR%20%20%7BDRR%7D%20%20OR%20%20%7Bsmart%20city%7D%20%20OR%20%20%7Bsmart%20cities%7D%20%20OR%20%20%7Bresilient%20building%7D%20%20OR%20%20%7Bresilient%20buildings%7D%20%20OR%20%20%7Bsustainable%20building%7D%20%20OR%20%20%7Bsustainable%20buildings%7D%20%20OR%20%20%7Bbuilding%20design%7D%20%20OR%20%20%7Bbuildings%20design%7D%20%20OR%20%20urbani%3Fation%20%20OR%20%20%7Bzero%20energy%20building%7D%20%20OR%20%20%7Bzero%20energy%20buildings%7D%20%20OR%20%20%7Bzero-energy%20building%7D%20%20OR%20%20%7Bzero-energy%20buildings%7D%20%20OR%20%20%7Bbasic%20service%7D%20%20OR%20%20%7Bbasic%20services%7D%20%20OR%20%20%7Bgovernance%7D%20%20OR%20%20%7Bcitizen%20participation%7D%20%20OR%20%20%7Bcollaborative%20planning%7D%20%20OR%20%20%7Bparticipatory%20planning%7D%20%20OR%20%20%7Binclusiveness%7D%20%20OR%20%20%7Bcultural%20heritage%7D%20%20OR%20%20%7Bnatural%20heritage%7D%20%20OR%20%20%7BUNESCO%7D%20%20OR%20%20%7Bdisaster%7D%20%20OR%20%20%7Becological%20footprint%7D%20%20OR%20%20%7Benvironmental%20footprint%7D%20%20OR%20%20%7Bwaste%7D%20%20OR%20%20%7Bpollution%7D%20%20OR%20%20%7Bpollutant*%7D%20%20OR%20%20%7Bwaste%20water%7D%20%20OR%20%20%7Brecycling%7D%20%20OR%20%20%7Bcircular%20economy%7D%20%20OR%20%20%7Bair%20quality%7D%20%20OR%20%20%7Bgreen%20space%7D%20%20OR%20%20%7Bgreen%20spaces%7D%20%20OR%20%20%7Bnature%20inclusive%7D%20%20OR%20%20%7Bnature%20inclusive%20building%7D%20%20OR%20%20%7Bnature%20inclusive%20buildings%7D%20)%20)",
    sdg12: "TITLE-ABS-KEY%20(%20%7Benvironmental%20pollution%7D%20OR%20%7Bhazardous%20waste%7D%20OR%20%7Bhazardous%20chemical%7D%20OR%20%7Bhazardous%20chemicals%7D%20OR%20%7Btoxic%20chemical%7D%20OR%20%7Btoxic%20chemicals%7D%20OR%20%7Bchemical%20pollution%7D%20OR%20%7Bozone%20depletion%7D%20OR%20%7Bpesticide%20pollution%7D%20OR%20%7Bpesticide%20stress%7D%20OR%20%7Bpesticide%20reduction%7D%20OR%20%7Blife%20cycle%20assessment%7D%20OR%20%7Blife%20cycle%20analysis%7D%20OR%20%7Blife%20cycle%20analyses%7D%20OR%20%7Blife-cycle%20analysis%7D%20OR%20%7Blife-cycle%20analyses%7D%20OR%20%7Blow%20carbon%20economy%7D%20OR%20%7Blow-carbon%20economy%7D%20OR%20%7Benvironmental%20footprint%7D%20OR%20%7Bmaterial%20footprint%7D%20OR%20%7Bharvest%20efficiency%7D%20OR%20%7Bsolid%20waste%7D%20OR%20%7Bwaste%20generation%7D%20OR%20%7Bcorporate%20social%20responsibility%7D%20OR%20%7Bcorporate%20sustainability%7D%20OR%20%7Bconsumer%20behavior%7D%20OR%20%7Bconsumer%20behaviors%7D%20OR%20%7Bconsumer%20behaviour%7D%20OR%20%7Bconsumer%20behaviours%7D%20OR%20%7Bwaste%20recycling%7D%20OR%20%7Bresource%20recycling%7D%20OR%20%7Bresource%20reuse%7D%20OR%20%7Bbiobased%20economy%7D%20OR%20%7Bzero%20waste%7D%20OR%20%7Bsustainability%20label%7D%20OR%20%7Bsustainability%20labelling%7D%20OR%20%7Bglobal%20resource%20extraction%7D%20OR%20%7Bmaterial%20flow%20accounting%7D%20OR%20%7Bsocietal%20metabolism%7D%20OR%20%7Bfood%20spill%7D%20OR%20%7Bresource%20spill%7D%20OR%20%7Bresource%20efficiency%7D%20OR%20%7Bsustainable%20food%20consumption%7D%20OR%20%7Bgreen%20consumption%7D%20OR%20%7Bsustainable%20supply%20chain%7D%20OR%20%7Bcircular%20economy%7D%20OR%20%7Bcradle%20to%20cradle%7D%20OR%20%7Bsustainable%20procurement%7D%20OR%20%7Bsustainable%20tourism%7D%20OR%20%7Bfossil-fuel%20subsidies%7D%20OR%20%7Bfossil-fuel%20expenditure%7D%20OR%20%7Bsustainability%20label%7D%20OR%20%7Bsustainability%20labelling%7D%20OR%20(%20consumption%20AND%20(%20%7Bresource%20use%7D%20OR%20spill%20)%20)%20OR%20(%20production%20AND%20(%20%7Bresource%20use%7D%20OR%20spill%20)%20)%20AND%20NOT%20(%20%7Bwireless%20sensor%20network%7D%20OR%20%7Bwireless%20sensor%20networks%7D%20OR%20%7Bwireless%20network%7D%20OR%20%7Bwireless%20networks%7D%20OR%20%7Bwireless%7D%20OR%20%7Bdisease%7D%20OR%20%7Bastrophysics%7D%20)%20)",
    sdg13: "TITLE-ABS-KEY%20(%20(%20%7Bclimate%20action%7D%20%20OR%20%20%7Bclimate%20adaptation%7D%20%20OR%20%20%7Bclimate%20change%7D%20%20OR%20%20%7Bclimate%20capitalism%7D%20%20OR%20%20ipcc%20%20OR%20%20%7Bclimate%20effect%7D%20%20OR%20%20%7Bclimate%20equity%7D%20%20OR%20%20%7Bclimate%20feedback%7D%20%20OR%20%20%7Bclimate%20finance%7D%20%20OR%20%20%7Bclimate%20change%20financing%7D%20%20OR%20%20%7Bclimate%20forcing%7D%20%20OR%20%20%7Bclimate%20governance%7D%20%20OR%20%20%7Bclimate%20impact%7D%20%20OR%20%20%7Bclimate%20investment%7D%20%20OR%20%20%7Bclimate%20justice%7D%20%20OR%20%20%7Bclimate%20mitigation%7D%20%20OR%20%20%7Bclimate%20model%7D%20%20OR%20%20%7Bclimate%20models%7D%20%20OR%20%20%7Bclimate%20modeling%7D%20%20OR%20%20%7Bclimate%20modelling%7D%20%20OR%20%20%7Bclimate%20policy%7D%20%20OR%20%20%7Bclimate%20policies%7D%20%20OR%20%20%7Bclimate%20risk%7D%20%20OR%20%20%7Bclimate%20risks%7D%20%20OR%20%20%7Bclimate%20services%7D%20%20OR%20%20%7Bclimate%20service%7D%20%20OR%20%20%7Bclimate%20prediction%7D%20%20OR%20%20%7Bclimate%20predictions%7D%20%20OR%20%20%7Bclimate%20signal%7D%20%20OR%20%20%7Bclimate%20signals%7D%20%20OR%20%20%7Bclimate%20tipping%20point%7D%20%20OR%20%20%7Bclimate%20variation%7D%20%20OR%20%20%7Bclimate%20variations%7D%20%20OR%20%20ecoclimatology%20%20OR%20%20eco-climatology%20%20OR%20%20%7BGreen%20Climate%20Fund%7D%20%20OR%20%20%7Bregional%20climate%7D%20%20OR%20%20%7Bregional%20climates%7D%20%20OR%20%20%7Burban%20climate%7D%20%20OR%20%20%7Burban%20climates%7D%20%20OR%20%20(%20climate%20%20AND%20%20(%20%7Badaptive%20management%7D%20%20OR%20%20awareness%20%20OR%20%20bioeconomy%20%20OR%20%20carbon%20%20OR%20%20%7Bdecision-making%7D%20%20OR%20%20%7Bdisaster%20risk%20reduction%7D%20%20OR%20%20%7Benvironmental%20education%7D%20%20OR%20%20%7Bsustainable%20development%20education%7D%20%20OR%20%20%7Benergy%20conservation%7D%20%20OR%20%20emission*%20%20OR%20%20extreme%20%20OR%20%20%7Bfood%20chain%7D%20%20OR%20%20%7Bfood%20chains%7D%20%20OR%20%20framework%20%20OR%20%20hazard*%20%20OR%20%20island*%20%20OR%20%20%7Bland%20use%7D%20%20OR%20%20megacit*%20%20OR%20%20consumption%20%20OR%20%20production%20%20OR%20%20%7Bsmall%20island%20developing%20states%7D%20%20OR%20%20anthropocene%20%20OR%20%20atmospher*%20%20OR%20%20%7Bclean%20development%20mechanism%7D%20%20OR%20%20%7Bglacier%20retreat%7D%20%20OR%20%20warming%20%20OR%20%20greenhouse%20%20OR%20%20%7Bice-ocean%20interaction%7D%20%20OR%20%20%7Bice-ocean%20interactions%7D%20%20OR%20%20%7Bnitrogen%20cycle%7D%20%20OR%20%20%7Bnitrogen%20cycles%7D%20%20OR%20%20%7Bocean%20acidification%7D%20%20OR%20%20%7Bradiative%20forcing%7D%20%20OR%20%20%7Bsea%20ice%7D%20%20OR%20%20%7Bsea%20level%7D%20%20OR%20%20%7Bsea%20levels%7D%20%20OR%20%20%7Bthermal%20expansion%7D%20%20OR%20%20unfccc%20%20OR%20%20ozone%20)%20)%20)%20%20AND%20NOT%20%20(%20%7Bdrug%7D%20%20OR%20%20%7Bgeomorphology%7D%20)%20)",
    sdg14: "TITLE-ABS-KEY%20(%20(%20marine%20%20OR%20%20ocean%20%20OR%20%20oceans%20%20OR%20%20sea%20%20OR%20%20seas%20%20OR%20%20coast*%20%20OR%20%20mangrove%20)%20%20AND%20%20(%20%7Bwater%20cycle%7D%20%20OR%20%20%7Bwater%20cycles%7D%20%20OR%20%20%7Bbiogeochemical%20cycle%7D%20%20OR%20%20%7Bbiogeochemical%20cycles%7D%20%20OR%20%20%7Boceanic%20circulation%20model%7D%20%20OR%20%20%7Boceanic%20circulation%20models%7D%20%20OR%20%20%7Boceanic%20circulation%20modelling%7D%20%20OR%20%20%7Boceanic%20circulation%20modeling%7D%20%20OR%20%20%7Bice-ocean%7D%20%20OR%20%20eutrophicat*%20%20OR%20%20marine%20%20OR%20%20%7Bcoral%20bleach%7D%20%20OR%20%20%7Bcoral%20bleaching%7D%20%20OR%20%20%7Bcoastal%20management%7D%20%20OR%20%20%7Bcoastal%20habitat%7D%20%20OR%20%20%7Bcoastal%20habitats%7D%20%20OR%20%20%7Bmarine%20debris%7D%20%20OR%20%20%7Bocean%20acidification%7D%20%20OR%20%20(%20acidification%20%20AND%20%20seawater%20)%20%20OR%20%20%7Bfishery%7D%20%20OR%20%20%7Bfisheries%7D%20%20OR%20%20%7Boverfishing%7D%20%20OR%20%20%7Bsustainable%20yield%7D%20%20OR%20%20%7Bmarine%20protected%20area%7D%20%20OR%20%20%7Bmarine%20protected%20areas%7D%20%20OR%20%20%7Bmarine%20conservation%7D%20%20OR%20%20%7Becotourism%7D%20%20OR%20%20%7Bcommunity%20based%20conservation%7D%20%20OR%20%20%7Bcommunity-based%20conservation%7D%20%20OR%20%20%7Bmarine%20land%20slide%7D%20%20OR%20%20%7Bmarine%20pollution%7D%20%20OR%20%20%7Bnutrient%20runoff%7D%20%20OR%20%20%7Bcoastal%20ecotourism%7D%20%20OR%20%20%7Bdestructive%20fishing%7D%20%20OR%20%20%7Blocal%20fisheries%7D%20%20OR%20%20%7Bartisanal%20fishers%7D%20%20OR%20%20%7Bfisheries%20rights%7D%20%20OR%20%20%7Bspecies%20richness%7D%20%20OR%20%20%7Btraditional%20ecological%20knowledge%7D%20%20OR%20%20%7Bsmall%20Island%20development%20states%7D%20%20OR%20%20%7Bmarine%20quota%7D%20%20OR%20%20%7Bmarine%20economy%7D%20%20OR%20%20%7Bmarine%20policy%7D%20)%20%20AND%20NOT%20%20(%20%7Bpaleoclimate%7D%20%20OR%20%20%7Bpaleoceanography%7D%20%20OR%20%20%7Bradiocarbon%7D%20%20OR%20%20%7Bgenetics%7D%20%20OR%20%20%7Bmedicine%7D%20%20OR%20%20%7Bdrug%7D%20%20OR%20%20%7Bengineering%7D%20%20OR%20%20%7Baerosol%7D%20)%20)",
    sdg15: "TITLE-ABS-KEY%20(%20(%20terrestrial%20%20OR%20%20land%20%20OR%20%20inland%20%20OR%20%20freshwater%20)%20%20AND%20%20(%20biodivers*%20%20OR%20%20%7Bspecies%20richness%7D%20%20OR%20%20bioeconom*%20%20OR%20%20bio-econom*%20%20OR%20%20%7Bbiological%20production%7D%20%20OR%20%20deforest*%20%20OR%20%20desertif*%20%20OR%20%20%7Bearth%20system%7D%20%20OR%20%20%7Becological%20resilience%7D%20%20OR%20%20ecosystem*%20%20OR%20%20eco-system*%20%20OR%20%20%7Btrophic%20cascade%7D%20%20OR%20%20%7Btrophic%20level%7D%20%20OR%20%20%7Btrophic%20web%7D%20%20OR%20%20%7Bthreatened%20species%7D%20%20OR%20%20%7Bendangered%20species%7D%20%20OR%20%20%7Bextinction%20risk%7D%20%20OR%20%20%7Bextinction%20risks%7D%20%20OR%20%20poach*%20%20OR%20%20%7Bwildlife%20product%7D%20%20OR%20%20%7Bwildlife%20products%7D%20%20OR%20%20%7Bwildlife%20traffic%7D%20%20OR%20%20%7Bwildlife%20market%7D%20%20OR%20%20%7Bwildlife%20markets%7D%20%20OR%20%20%7Bwildlife%20trafficking%7D%20%20OR%20%20%7Binvasive%20species%7D%20%20OR%20%20%7Balien%20species%7D%20%20OR%20%20%7Bland%20uses%7D%20%20OR%20%20%7Bland%20use%7D%20%20OR%20%20%7Bland%20uses%7D%20%20OR%20%20%7Bland%20degradation%7D%20%20OR%20%20%7Bsoil%20degradation%7D%20%20OR%20%20%7BLULUCF%7D%20%20OR%20%20*forest*%20%20OR%20%20%7Bland%20conservation%7D%20%20OR%20%20wetland*%20%20OR%20%20mountain*%20%20OR%20%20dryland*%20%20OR%20%20%7Bmountainous%20cover%7D%20%20OR%20%20%7Bprotected%20area%7D%20%20OR%20%20%7Bprotected%20areas%7D%20%20OR%20%20%7BREDD%7D%20%20OR%20%20%7Bforest%20management%7D%20%20OR%20%20%7Bsilviculture%7D%20%20OR%20%20%7Btimber%20harvest%7D%20%20OR%20%20%7Billegal%20logging%7D%20%20OR%20%20%7Bslash-and-burn%7D%20%20OR%20%20%7Bfire-fallow%20cultivation%7D%20%20OR%20%20%7Btree%20cover%7D%20%20OR%20%20%7Bsoil%20restoration%7D%20%20OR%20%20%7Bland%20restoration%7D%20%20OR%20%20%7Bdrought%7D%20%20OR%20%20%7Bsustainable%20land%20management%7D%20%20OR%20%20%7Bmountain%20vegetation%7D%20%20OR%20%20%7Bhabitat%20restoration%7D%20%20OR%20%20%7BRed%20List%20species%7D%20%20OR%20%20%7BRed%20List%20Index%7D%20%20OR%20%20%7Bextinction%20wave%7D%20%20OR%20%20%7Bhabitat%20fragmentation%7D%20%20OR%20%20%7Bhabitat%20loss%7D%20%20OR%20%20%7BNagoya%20Protocol%20on%20Access%20to%20Genetic%20Resources%7D%20%20OR%20%20%7Bgenetic%20resources%7D%20%20OR%20%20%7Bbiological%20invasion%7D%20%20OR%20%20%7Bbiodiversity-inclusive%7D%20%20OR%20%20%7Bforest%20stewardship%20council%7D%20%20OR%20%20%7Brainforest%20alliance%7D%20%20OR%20%20%7Bforest%20certification%7D%20%20OR%20%20%7Bforest%20auditing%7D%20%20OR%20%20%7Becotourism%7D%20%20OR%20%20%7Bcommunity-based%20conservation%7D%20%20OR%20%20%7Bcommunity%20based%20conservation%7D%20%20OR%20%20%7Bhuman-wildlife%20conflict%7D%20)%20)",
    sdg16: "TITLE-ABS-KEY%20(%20(%20%7Bactual%20innocence%7D%20OR%20%7Bfalse%20confession%7D%20OR%20%7Barmed%20conflict%7D%20OR%20%7Barmed%20conflicts%7D%20OR%20%7Bcivil%20conflict%7D%20OR%20%7Bcivil%20conflicts%7D%20OR%20(%20war%20AND%20(%20conflict%20OR%20warfare%20OR%20democracy%20OR%20%7BGeneva%20Convention%7D%20OR%20treaty%20OR%20peace%20)%20)%20OR%20%7Bpeacekeeping%7D%20OR%20(%20corruption%20AND%20(%20%7Binstitution%7D%20OR%20%7Bpublic%20official%7D%20OR%20%7Bgovernment%7D%20OR%20%7Bbribery%7D%20OR%20%7Bconflict%7D%20)%20)%20OR%20crime%20OR%20crimes%20OR%20criminal%20OR%20%7Bdemocratic%20deficit%7D%20OR%20(%20democrati%3Fation%20AND%20(%20institutional%20OR%20conflict%20OR%20decision-making%20OR%20society%20OR%20politics%20OR%20%7Bfinancial%20aid%7D%20)%20)%20OR%20%7Bethnic%20conflict%7D%20OR%20%7Bethnic%20conflicts%7D%20OR%20exoneration%20OR%20genocid*%20OR%20homicid*%20OR%20murder*%20OR%20%7Bhuman%20trafficking%7D%20OR%20%7Bcriminal%20justice%20system%7D%20OR%20%7Bjustice%20system%7D%20OR%20%7Barbitrary%20justice%7D%20OR%20refugee*%20OR%20terroris*%20OR%20violence%20OR%20torture%20OR%20%7Beffective%20rule%20of%20law%7D%20OR%20%7Barms%20flow%7D%20OR%20%7Btransparent%20institution%7D%20OR%20%7Btransparent%20institutions%7D%20OR%20%7Bgood%20governance%7D%20OR%20%7Blegal%20identity%20for%20all%7D%20OR%20%7Bfreedom%20of%20information%7D%20OR%20%7Bhuman%20rights%20institution%7D%20OR%20%7Bhuman%20rights%20activists%7D%20OR%20%7Bfundamental%20freedom%7D%20OR%20%7Bfundamental%20freedoms%7D%20OR%20%7Bviolent%20conflict%7D%20OR%20%7Bviolent%20conflicts%7D%20OR%20%7Bpeaceful%20society%7D%20OR%20%7Beffective%20institution%7D%20OR%20%7Beffective%20institutions%7D%20OR%20%7Baccountable%20institution%7D%20OR%20%7Baccountable%20institutions%7D%20OR%20%7Binclusive%20institution%7D%20OR%20%7Binclusive%20institutions%7D%20OR%20%7Bchild%20abuse%7D%20OR%20%7Barbitrary%20detention%7D%20OR%20%7Bunsentenced%20detention%7D%20OR%20%7Bjudicial%20system%7D%20OR%20%7Bcriminal%20tribunal%7D%20OR%20%7Binclusive%20society%7D%20OR%20%7Binclusive%20societies%7D%20OR%20%7Bresponsive%20institution%7D%20OR%20%7Bresponsive%20institutions%7D%20OR%20%7Bfair%20society%7D%20OR%20%7Bfair%20societies%7D%20OR%20%7Blegal%20remedy%7D%20OR%20%7Blegal%20remedies%7D%20OR%20%7Bindependence%20of%20judiciary%7D%20OR%20%7Bindependent%20judiciary%7D%20OR%20%7Bseparation%20of%20powers%7D%20OR%20extremism%20OR%20%7Bwar%20crime%7D%20OR%20%7Bpeaceful%20society%7D%20OR%20%7Borganized%20crime%7D%20OR%20%7Billicit%20transfer%7D%20OR%20%7Billicit%20money%7D%20OR%20%7Barms%20trafficking%7D%20OR%20%7Bcybercrime%7D%20OR%20%7Binsurgence%7D%20OR%20%7Bdemocratic%20institution%7D%20OR%20%7Bpolitical%20instability%7D%20OR%20(%20%7Bpolitical%20decision-making%7D%20AND%20(%20responsive%20OR%20inclusive%20OR%20participatory%20OR%20representative%20)%20)%20OR%20%7BAarhus%20Convention%7D%20OR%20%7Bpress%20freedom%7D%20OR%20%7Bfreedom%20of%20speech%7D%20)%20AND%20NOT%20(%20%7Bdisease%7D%20OR%20%7Bgenetics%7D%20)%20)"
};

module.exports = sdgQueries;