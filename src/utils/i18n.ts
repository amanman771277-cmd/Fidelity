export type Language = 'am' | 'en';

export interface Translations {
  brandName: string;
  brandSubtitle: string;
  motto: string;
  mottoSub: string;
  nav: {
    divisions: string;
    portfolio: string;
    philosophy: string;
    contact: string;
    admin: string;
    language: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleGradient: string;
    subtitle: string;
    explorePortfolio: string;
    connectTelegram: string;
    exploreDivisions: string;
    viewDivisionWorks: string;
  };
  sectors: {
    badge: string;
    heading: string;
    subtitle: string;
    viewWorks: string;
    consultTelegram: string;
    architects: {
      name: string;
      shortName: string;
      tagline: string;
      description: string;
      badge: string;
      capabilities: string[];
      metrics: { label: string; value: string }[];
      cta: string;
    };
    branding: {
      name: string;
      shortName: string;
      tagline: string;
      description: string;
      badge: string;
      capabilities: string[];
      metrics: { label: string; value: string }[];
      cta: string;
    };
    furniture: {
      name: string;
      shortName: string;
      tagline: string;
      description: string;
      badge: string;
      capabilities: string[];
      metrics: { label: string; value: string }[];
      cta: string;
    };
  };
  portfolio: {
    badge: string;
    heading: string;
    subtitle: string;
    searchPlaceholder: string;
    allSectors: string;
    inquireTelegram: string;
    viewDetails: string;
    noResults: string;
    noResultsSub: string;
    resetFilters: string;
    postNewWork: string;
    liveFirestore: string;
    offlineCache: string;
    clientLabel: string;
  };
  lightbox: {
    badge: string;
    discussTitle: string;
    connectBtn: string;
    client: string;
    location: string;
    year: string;
  };
  philosophy: {
    badge: string;
    quote: string;
    p1: string;
    p2: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    partnerBtn: string;
    milestonesTitle: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    directDeskTitle: string;
    responseSpeed: string;
  };
  contact: {
    badge: string;
    heading: string;
    subtitle: string;
    vipTitle: string;
    vipDesc: string;
    vipFeature1: string;
    vipFeature2: string;
    vipBtn: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    divisionLabel: string;
    divisionAll: string;
    divisionArch: string;
    divisionBrand: string;
    divisionFurn: string;
    scopeLabel: string;
    scopePlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    openTelegramBtn: string;
    hqLabel: string;
    emailLabel: string;
  };
  admin: {
    triggerBtn: string;
    portalTitle: string;
    authBadge: string;
    lockedBadge: string;
    loginTitle: string;
    loginDesc: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    unlockBtn: string;
    defaultPassHint: string;
    tabCreate: string;
    tabManage: string;
    tabFirebase: string;
    publishTitle: string;
    publishSubtitle: string;
    samplePresetsTitle: string;
    oneClickTest: string;
    fieldTitle: string;
    fieldSector: string;
    fieldImageUrl: string;
    cloudinaryDetected: string;
    standardUrl: string;
    livePreview: string;
    fieldDesc: string;
    fieldClient: string;
    fieldLocation: string;
    fieldYear: string;
    publishBtn: string;
    publishingBtn: string;
    publishSuccess: string;
    existingTitle: string;
    existingSubtitle: string;
    deleteConfirm: string;
    editPost: string;
    updatePostBtn: string;
    updatingPostBtn: string;
    cancelEdit: string;
    editingBanner: string;
    fieldTitleAm: string;
    fieldTitleEn: string;
    fieldDescAm: string;
    fieldDescEn: string;
    logOut: string;
  };
  footer: {
    motto: string;
    desc: string;
    alliedTitle: string;
    navTitle: string;
    copyright: string;
    adminAccess: string;
  };
}

export const I18N: Record<Language, Translations> = {
  am: {
    brandName: 'ፊዴሊቲ',
    brandSubtitle: 'ቢዝነስ ግሩፕ',
    motto: 'ከሃሳብ ወደ ታላቅ ንግድ ግዛት!',
    mottoSub: 'ከሃሳብ ወደ ታላቅ ንግድ ግዛት!',
    nav: {
      divisions: 'ዘርፎች',
      portfolio: 'ፖርትፎሊዮ',
      philosophy: 'ራዕይና ፍልስፍና',
      contact: 'አግኙን',
      admin: 'አድሚን ፓናል (v3.0)',
      language: 'ቋንቋ ቀይር'
    },
    hero: {
      badge: 'ከሃሳብ ወደ ታላቅ ንግድ ግዛት!',
      titleStart: 'ፊዴሊቲ',
      titleGradient: 'ቢዝነስ ግሩፕ',
      subtitle: 'የምህንድስና ጥበብን፣ አለም አቀፍ የብራንዲንግ ልቀትን እና የቅንጦት የውስጥ ዲዛይን አቀናጅቶ የተሟላ የንግድ ግዛቶችን የሚገነባ ቀዳሚ የቢዝነስ ጥምረት።',
      explorePortfolio: 'ፖርትፎሊዮ ይመልከቱ',
      connectTelegram: 'በቴሌግራም ይገናኙን (@amanman777)',
      exploreDivisions: 'ዋና ዘርፎችን ይመልከቱ',
      viewDivisionWorks: 'የዘርፉን ሥራዎች ይመልከቱ'
    },
    sectors: {
      badge: 'ዋና ዋና ዘርፎች',
      heading: 'ሶስት ዘርፎች፣ አንድ ጥምር ራዕይ',
      subtitle: 'አርክቴክቸራል ምህንድስናን፣ ከፍተኛ ተደራሽነት ያለው ብራንዲንግን እና የተመረጠ የውስጥ ዲዛይንን በማዋሃድ ሙሉ የንግድ ልቀትን እናረጋግጣለን።',
      viewWorks: 'ሥራዎችን ይመልከቱ',
      consultTelegram: 'በቴሌግራም ያማክሩን',
      architects: {
        name: 'ፊዴሊቲ አርክቴክቶች እና አማካሪ መሐንዲሶች',
        shortName: 'አርክቴክቸርና ምህንድስና',
        tagline: 'ዘመናዊ የምህንድስና ጥበብና ግዙፍ ህንፃዎች',
        description: 'የከተማ ፕላኒንግ፣ ከፍተኛ ፎቆች መዋቅራዊ ምህንድስና፣ የMEP ሲስተሞችና የ3D BIM ሞዴሊንግ በማከናወን ራዕይን ወደ እውነተኛ ግንባታ እንቀይራለን።',
        badge: 'ዘርፍ 01',
        capabilities: [
          'የከተማና የመሬት አጠቃቀም ፕላኒንግ',
          'የከፍተኛ የንግድና የመኖሪያ ህንፃዎች አርክቴክቸር',
          'መዋቅራዊ፣ ሲቪል እና MEP ምህንድስና',
          '3D BIM ሞዴሊንግ እና ዲጂታል ፕላን',
          'የግንባታ ፈቃድ ማጠናቀቅና ጥብቅ ቁጥጥር'
        ],
        metrics: [
          { label: 'የተጠናቀቁ ፕሮጀክቶች', value: '75+' },
          { label: 'የደህንነት ደረጃ', value: '100%' },
          { label: 'የተገነባ ስፋት', value: '1.2M+ ካ.ሜ' }
        ],
        cta: 'የአርክቴክቸር ሥራዎች'
      },
      branding: {
        name: 'ፊዴሊቲ ብራንዲንግ እና ማስታወቂያ',
        shortName: 'ብራንዲንግና ማስታወቂያ',
        tagline: 'የብራንድ የበላይነትና ባለ 360° የሚዲያ ተፅዕኖ',
        description: 'ተወዳዳሪ የሌላቸው የድርጅት መለያዎችን፣ ሀገር አቀፍ የማስታወቂያ ዘመቻዎችን እና ዲጂታል ስትራቴጂዎችን በመቅረፅ ተቋማትን በገበያ ግንባር እናሰልፋለን።',
        badge: 'ዘርፍ 02',
        capabilities: [
          'የድርጅት ማንነትና የሎጎ/ሞኖግራም ዲዛይን',
          'ባለ 360° አጠቃላይ የማስታወቂያ ዘመቻዎች',
          'የዲጂታል ስትራቴጂ እና የማህበራዊ ሚዲያ ስራ',
          'ግዙፍ የውጪ ቢልቦርዶችና ዘመናዊ ምልክቶች',
          'ሲኒማቲክ የቪዲዮ ፕሮዳክሽን እና የህዝብ ግንኙነት'
        ],
        metrics: [
          { label: 'የዘመቻ ተደራሽነት', value: '25M+' },
          { label: 'የተፈጠረ የብራንድ እሴት', value: '$80M+' },
          { label: 'አጋር ድርጅቶች', value: '120+' }
        ],
        cta: 'የብራንዲንግ ሥራዎች'
      },
      furniture: {
        name: 'ፊዴሊቲ ፈርኒቸር እና የውስጥ ዲዛይን',
        shortName: 'ፈርኒቸርና የውስጥ ዲዛይን',
        tagline: 'የቅንጦት ጥበብና የተሟላ የቢሮ ማስተካከል',
        description: 'ለአስፈፃሚዎች እና ከፍተኛ አመራሮች የሚሆኑ ብጁ የቢሮ እቃዎችን፣ የሆቴልና የቪላ የውስጥ ማስዋብን እንዲሁም ድምፅ የማይረብሽ አኮስቲክስ ጥበብን እናቀርባለን።',
        badge: 'ዘርፍ 03',
        capabilities: [
          'ብጁ የቦርድ ክፍልና የአመራር ፈርኒቸር',
          'የተሟላ የንግድና የሆስፒታሊቲ የውስጥ ማስዋብ',
          'የከፍተኛ መኖሪያ ቤቶች የውስጥ ስታይሊንግ',
          'የእንጨት፣ ቆዳ እና የነሐስ/ወርቅ ጌጦች ጥምረት',
          'ምቹና ዘመናዊ የስራ ቦታ ማመቻቸት'
        ],
        metrics: [
          { label: 'የተረከቡ ክፍሎች', value: '210+' },
          { label: 'ብጁ ፈርኒቸሮች', value: '1,500+' },
          { label: 'የደንበኛ እርካታ', value: '99.4%' }
        ],
        cta: 'የፈርኒቸር ሥራዎች'
      }
    },
    portfolio: {
      badge: 'የተመረጡ ሥራዎች',
      heading: 'ተለዋዋጭ ፖርትፎሊዮ',
      subtitle: 'በቅርብ የተከናወኑ የአርክቴክቸር ህንፃዎች፣ የብራንዲንግ ስራዎች እና የቅንጦት የውስጥ ዲዛይኖች ማሳያ።',
      searchPlaceholder: 'ሥራዎችን ወይም ደንበኞችን ይፈልጉ...',
      allSectors: 'ሁሉም ዘርፎች',
      inquireTelegram: 'በቴሌግራም ይጠይቁ (@amanman777)',
      viewDetails: 'ዝርዝር ይመልከቱ',
      noResults: 'ምንም የተገኘ ፕሮጀክት የለም',
      noResultsSub: 'የመፈለጊያ ቃሉን ወይም የዘርፍ ምርጫውን ይቀይሩ ወይም በአድሚን ፓናል አዲስ ስራ ያክሉ።',
      resetFilters: 'ሁሉንም አሳይ',
      postNewWork: 'አዲስ ሥራ ጨምር (v3.0)',
      liveFirestore: 'ፋየርቤዝ ቀጥታ',
      offlineCache: 'የአካባቢ ዳታቤዝ',
      clientLabel: 'ደንበኛ:'
    },
    lightbox: {
      badge: 'የፕሮጀክት ማሳያ',
      discussTitle: 'ስለዚህ ፕሮጀክት በቀጥታ ይወያዩ:',
      connectBtn: 'በቴሌግራም ያግኙን (@amanman777)',
      client: 'ደንበኛ:',
      location: 'ቦታ:',
      year: 'ዓ.ም / ዓ.ም.ፈ:'
    },
    philosophy: {
      badge: 'የድርጅቱ ፍልስፍና',
      quote: '«ከሃሳብ ወደ ታላቅ ንግድ ግዛት!»',
      p1: 'ታላላቅ የንግድ ግዛቶች የሚገነቡት በተበታተነ ጥረት ሳይሆን ከተሟላ የተቀናጀ አመራር ነው፤ ከመጀመሪያው የንድፍ ሃሳብ፣ በጠንካራ ምህንድስና፣ በላቀ የብራንዲንግ ተፅዕኖ እስከ ቅንጡ የቢሮ አደረጃጀት ድረስ።',
      p2: 'ፊዴሊቲ ቢዝነስ ግሩፕ እነዚህን ሶስት ወሳኝ ምሰሶዎች—አርክቴክቶችና መሐንዲሶች፣ ብራንዲንግና ማስታወቂያ፣ እንዲሁም ፈርኒቸርና የውስጥ ዲዛይን—በአንድ ላይ በማቀናጀት ዘላቂ ንግድ ይገነባል።',
      pillar1Title: 'የማይደራደር ምህንድስና',
      pillar1Desc: 'የደህንነት ደረጃቸው አስተማማኝ የሆኑ፣ የመሬት መንቀጥቀጥን የሚቋቋሙና ለትውልድ የሚቆዩ ህንፃዎች።',
      pillar2Title: 'ከፍተኛ የብራንድ ተፅዕኖ',
      pillar2Desc: 'በገበያው ውስጥ አንቱታን የሚያጎናፅፉ ባለ 360° የህዝብ ግንኙነትና የማስታወቂያ ስልቶች።',
      pillar3Title: 'የተመረጠ የቅንጦት ጥበብ',
      pillar3Desc: 'ለከፍተኛ አመራር ብቁ የሆኑ የፈርኒቸር እቃዎች እና ድምፅ አልባ ሰላማዊ የቢሮ አከባቢ።',
      pillar4Title: 'የተሟላ ኃላፊነት',
      pillar4Desc: 'ከመጀመሪያው ፕላን ጀምሮ እስከ መጨረሻው ርክክብ በአንድ ወጥ ጥራት የሚመራ ስራ።',
      partnerBtn: 'በቴሌግራም አጋር ይሁኑ',
      milestonesTitle: 'ተቋማዊ ስኬቶች',
      stat1Label: 'የተጠናቀቁ ፕሮጀክቶች',
      stat2Label: 'የተፈጠረ የሀብት እሴት',
      stat3Label: 'ጥምር ዘርፎች',
      directDeskTitle: 'የቀጥታ ስራ አስፈፃሚ መስመር',
      responseSpeed: 'በ2 ሰዓት ውስጥ ምላሽ'
    },
    contact: {
      badge: 'የቀጥታ አመራር መገናኛ',
      heading: 'የንግድ ግዛትዎን አብረን እንጀምር',
      subtitle: 'ለአርክቴክቸራል ጥናት፣ ለድርጅት ብራንዲንግ ስራዎች ወይም ለቅንጦት ፈርኒቸር በቀጥታ ከአመራሩ ጋር ይገናኙ።',
      vipTitle: 'ዋና የመገናኛ ቻናል (ቴሌግራም)',
      vipDesc: 'ፈጣን ምላሽ ለማግኘት፣ የፕሮጀክት ንድፎችን ለመለዋወጥና በሚስጥር ለመወያየት ወዲያውኑ በቴሌግራም ያግኙን።',
      vipFeature1: 'ፈጣን የቀጥታ ስራ አስፈፃሚ ምላሽ',
      vipFeature2: 'ሚስጥራዊ የውይይትና የሰነድ ልውውጥ',
      vipBtn: 'አሁን @amanman777 መልዕክት ይላኩ',
      formTitle: 'የፕሮጀክት ማጠቃለያ ይላኩ',
      formSubtitle: 'መረጃዎን ያስገቡ፤ ማስገባትዎን ሲጫኑ በቀጥታ በቴሌግራም መልዕክት ይዘጋጃል።',
      nameLabel: 'የእርስዎ ወይም የድርጅቱ ስም *',
      namePlaceholder: 'ምሳሌ፦ ዳዊት ተስፋዬ / አልፋ ሆልዲንግስ',
      divisionLabel: 'የሚፈልጉት ዘርፍ',
      divisionAll: 'የሶስቱም ዘርፎች ጥምረት',
      divisionArch: 'ፊዴሊቲ አርክቴክቶች እና አማካሪ መሐንዲሶች',
      divisionBrand: 'ፊዴሊቲ ብራንዲንግ እና ማስታወቂያ',
      divisionFurn: 'ፊዴሊቲ ፈርኒቸር እና የውስጥ ዲዛይን',
      scopeLabel: 'የፕሮጀክቱ ዝርዝር ፍላጎት *',
      scopePlaceholder: 'ስለ ህንፃው ቦታ፣ ስለ ማስታወቂያው አላማ ወይም ስለ ፈርኒቸር ፍላጎትዎ እዚህ ያብራሩ...',
      submitBtn: 'መረጃውን በቴሌግራም አስተላልፍ (@amanman777)',
      successTitle: 'መልዕክትዎ ተዘጋጅቷል',
      successDesc: 'የፕሮጀክትዎ መረጃ ተዘጋጅቷል። ቴሌግራም በራሱ ካልተከፈተ ከታች ያለውን ይጫኑ:',
      openTelegramBtn: 'ቴሌግራም ይክፈቱ (@amanman777)',
      hqLabel: 'ዋና መስሪያ ቤት: የፋይናንስ ወረዳ',
      emailLabel: 'corporate@fidelitybusinessgroup.com'
    },
    admin: {
      triggerBtn: 'አድሚን ፓናል (v3.0)',
      portalTitle: 'ፊዴሊቲ አድሚን ፖርታል',
      authBadge: 'የተረጋገጠ አድሚን • ፋየርቤዝ እና ክላውዲነሪ',
      lockedBadge: 'የይለፍ ቃል ያስፈልጋል',
      loginTitle: 'የአስተዳዳሪ መግቢያ',
      loginDesc: 'ፖርትፎሊዮዎችን ለማስተዳደር፣ ፋየርቤዝ ለማገናኘት እና ክላውዲነሪ ምስሎችን ለመስቀል የይለፍ ቃልዎን ያስገቡ።',
      passwordLabel: 'የአድሚን የይለፍ ቃል',
      passwordPlaceholder: 'የይለፍ ቃል ያስገቡ (መደበኛ: admin123)',
      unlockBtn: 'አድሚን ፓናልን ክፈት (v3.0)',
      defaultPassHint: 'መደበኛ የይለፍ ቃል: admin123',
      tabCreate: 'አዲስ ሥራ ጨምር',
      tabManage: 'ሥራዎችን አስተዳድር',
      tabFirebase: 'ፋየርቤዝ እና ክላውዲነሪ',
      publishTitle: 'አዲስ የፕሮጀክት ሥራ ይለጥፉ',
      publishSubtitle: 'የሚለጠፉ ሥራዎች ወዲያውኑ በፖርትፎሊዮው ላይ ይታያሉ፤ በፋየርቤዝ ዳታቤዝም ይቀመጣሉ።',
      samplePresetsTitle: 'የሙከራ ናሙናዎች (Cloudinary / Unsplash)',
      oneClickTest: 'በ1-ጠቅታ ሞክር',
      fieldTitle: 'የፕሮጀክቱ ርዕስ *',
      fieldSector: 'የስራ ዘርፍ *',
      fieldImageUrl: 'የምስል ሊንክ (Cloudinary የሚደገፍ) *',
      cloudinaryDetected: '• ክላውዲነሪ ሊንክ ተገኝቷል: አውቶማቲክ ማሻሻያ (f_auto, q_auto) ነቅቷል',
      standardUrl: '• መደበኛ የምስል ሊንክ',
      livePreview: 'የምስሉ ቅድመ እይታ',
      fieldDesc: 'የፕሮጀክት ዝርዝር መግለጫ *',
      fieldClient: 'ደንበኛ / ድርጅት',
      fieldLocation: 'የተከናወነበት ቦታ',
      fieldYear: 'የተከናወነበት ዓመት',
      publishBtn: 'ሥራውን በፖርትፎሊዮው ላይ ለጥፍ',
      publishingBtn: 'በመለጠፍ ላይ...',
      publishSuccess: 'ሥራው በተሳካ ሁኔታ ተለጥፏል! በዋናው ገፅ ላይ ወዲያውኑ ይታያል።',
      existingTitle: 'ያሉ ሥራዎች',
      existingSubtitle: 'ሥራዎችን ይመልከቱ ወይም ይሰርዙ። ስረዛዎች ወዲያውኑ በድረ-ገፁ ላይ ይተገበራሉ።',
      deleteConfirm: 'ይህንን ፕሮጀክት በእርግጥ መሰረዝ ይፈልጋሉ?',
      editPost: 'አስተካክል',
      updatePostBtn: 'ሥራውን አዘምን (Update Post)',
      updatingPostBtn: 'በማዘመን ላይ...',
      cancelEdit: 'ማስተካከል አቁም',
      editingBanner: 'ሥራውን እያስተካከሉ ነው',
      fieldTitleAm: 'የፕሮጀክት ርዕስ (አማርኛ) *',
      fieldTitleEn: 'የፕሮጀክት ርዕስ (English) *',
      fieldDescAm: 'የፕሮጀክት ዝርዝር መግለጫ (አማርኛ) *',
      fieldDescEn: 'የፕሮጀክት ዝርዝር መግለጫ (English) *',
      logOut: 'ውጣ'
    },
    footer: {
      motto: 'ከሃሳብ ወደ ታላቅ ንግድ ግዛት!',
      desc: 'ፊዴሊቲ ቢዝነስ ግሩፕ የምህንድስና፣ የብራንዲንግ እና የቅንጦት ፈርኒቸር ጥምረት ነው።',
      alliedTitle: 'ዘርፎች',
      navTitle: 'አሰሳ',
      copyright: '© 2026 ፊዴሊቲ ቢዝነስ ግሩፕ። መብቱ በህግ የተጠበቀ ነው።',
      adminAccess: 'አድሚን 3.0'
    }
  },
  en: {
    brandName: 'FIDELITY',
    brandSubtitle: 'BUSINESS GROUP',
    motto: 'From thought to empire!',
    mottoSub: 'From thought to empire!',
    nav: {
      divisions: 'Divisions',
      portfolio: 'Portfolio',
      philosophy: 'Philosophy',
      contact: 'Contact',
      admin: 'Admin Panel (v3.0)',
      language: 'Change Language'
    },
    hero: {
      badge: 'From thought to empire!',
      titleStart: 'FIDELITY',
      titleGradient: 'BUSINESS GROUP',
      subtitle: 'A multi-disciplinary conglomerate uniting monumental engineering, visionary brand dominance, and bespoke architectural luxury. We turn abstract conceptual thoughts into permanent commercial empires.',
      explorePortfolio: 'Explore Portfolio',
      connectTelegram: 'Connect on Telegram (@amanman777)',
      exploreDivisions: 'Explore Allied Divisions',
      viewDivisionWorks: 'View Division Works'
    },
    sectors: {
      badge: 'Allied Sectors',
      heading: 'Three Divisions, One Singular Vision',
      subtitle: 'By integrating architectural engineering, high-caliber branding, and bespoke luxury interior design, Fidelity Business Group delivers end-to-end commercial mastery without fragmentation.',
      viewWorks: 'View Works',
      consultTelegram: 'Consult on Telegram',
      architects: {
        name: 'Fidelity Architects & Consulting Engineers',
        shortName: 'Architects & Engineers',
        tagline: 'Precision Engineering & Monumental Architecture',
        description: 'Transforming land and vision into world-class architectural landmarks. We provide full-cycle structural engineering, sustainable urban planning, MEP consultancy, and BIM modeling.',
        badge: 'Division 01',
        capabilities: [
          'Master Urban & Landscape Planning',
          'High-Rise Commercial & Residential Architecture',
          'Structural, Civil & MEP Engineering',
          '3D BIM Modeling & Digital Twins',
          'Government Permitting & Project Supervision'
        ],
        metrics: [
          { label: 'Completed Developments', value: '75+' },
          { label: 'Structural Safety Record', value: '100%' },
          { label: 'Engineered Sq. Meters', value: '1.2M+' }
        ],
        cta: 'Architecture Works'
      },
      branding: {
        name: 'Fidelity Branding & Advertising',
        shortName: 'Branding & Advertising',
        tagline: 'Brand Supremacy & 360° Media Impact',
        description: 'Forging iconic corporate identities and high-converting advertising campaigns that position enterprises at the forefront of their industries. From thought to empire.',
        badge: 'Division 02',
        capabilities: [
          'Corporate Identity & Monogram Crafting',
          '360° Omnichannel Advertising Campaigns',
          'Digital Strategy & High-Impact Social Media',
          'Premium Outdoor Signage & Billboard Networks',
          'Cinematic Commercial Production & PR'
        ],
        metrics: [
          { label: 'Campaign Reach', value: '25M+' },
          { label: 'Brand Value Generated', value: '$80M+' },
          { label: 'Corporate Partners', value: '120+' }
        ],
        cta: 'Branding Works'
      },
      furniture: {
        name: 'Fidelity Furniture & Interior Design',
        shortName: 'Furniture & Interiors',
        tagline: 'Bespoke Craftsmanship & Luxury Fit-Outs',
        description: 'Crafting tailored executive environments and private sanctuaries with artisanal furniture, precision acoustics, and immaculate architectural millwork.',
        badge: 'Division 03',
        capabilities: [
          'Custom Executive & Boardroom Furniture',
          'Turnkey Commercial & Hospitality Fit-Outs',
          'High-End Residential Interior Staging',
          'Artisanal Joinery, Leather & Metal Accents',
          'Ergonomic Workplace Space Optimization'
        ],
        metrics: [
          { label: 'Turnkey Spaces Delivered', value: '210+' },
          { label: 'Custom Masterpieces', value: '1,500+' },
          { label: 'Client Satisfaction', value: '99.4%' }
        ],
        cta: 'Furniture Works'
      }
    },
    portfolio: {
      badge: 'Live Showcase',
      heading: 'Dynamic Portfolio',
      subtitle: 'Explore recent architectural landmarks, 360° branding campaigns, and bespoke executive interiors.',
      searchPlaceholder: 'Search works, clients...',
      allSectors: 'All Sectors',
      inquireTelegram: 'Inquire @amanman777',
      viewDetails: 'View Details',
      noResults: 'No Projects Match Your Filter',
      noResultsSub: 'Try adjusting your sector filter or search keyword, or publish a new work in the v3.0 Admin Panel.',
      resetFilters: 'Reset Filters',
      postNewWork: 'Post New Work (v3.0)',
      liveFirestore: 'Firestore Live',
      offlineCache: 'Offline Cache',
      clientLabel: 'Client:'
    },
    lightbox: {
      badge: 'Project Showcase',
      discussTitle: 'Discuss this project directly:',
      connectBtn: 'Connect on Telegram (@amanman777)',
      client: 'Client:',
      location: 'Location:',
      year: 'Year:'
    },
    philosophy: {
      badge: 'Corporate Philosophy',
      quote: '“From thought to empire!”',
      p1: 'Great commercial enterprises do not emerge through fragmented effort. They require an unbroken chain of mastery: from the first conceptual sketch, through rigorous civil engineering, onto pervasive national brand positioning, culminating in bespoke, tactile executive environments.',
      p2: 'Fidelity Business Group was forged to eliminate intermediate friction. Our allied sectors—Architects & Consulting Engineers, Branding & Advertising, and Furniture & Interior Design—collaborate with synchronized precision to construct enduring commercial empires.',
      pillar1Title: 'Uncompromising Engineering',
      pillar1Desc: 'Rigorous structural integrity, seismic safety, and cutting-edge BIM modeling that endures generations.',
      pillar2Title: 'High-Impact Brand Power',
      pillar2Desc: '360° Omnichannel presence, visual dominance, and narrative filmmaking that commands premium market valuation.',
      pillar3Title: 'Artisanal Luxury',
      pillar3Desc: 'Custom executive furniture, calibrated acoustics, and turnkey millwork crafted without compromise.',
      pillar4Title: 'Turnkey Accountability',
      pillar4Desc: 'Single-point leadership from conceptual blueprints to final handover and public brand unveiling.',
      partnerBtn: 'Partner With Us on Telegram',
      milestonesTitle: 'Institutional Milestones',
      stat1Label: 'Completed Projects',
      stat2Label: 'Portfolio Value',
      stat3Label: 'Allied Divisions',
      directDeskTitle: 'Direct Executive Channel',
      responseSpeed: 'Response within 2 hours'
    },
    contact: {
      badge: 'Direct Executive Access',
      heading: 'Initiate Your Commercial Empire',
      subtitle: 'Connect directly with leadership for architectural feasibility, corporate branding mandates, or turnkey executive interiors.',
      vipTitle: 'Preferred Direct Channel (Telegram)',
      vipDesc: 'For prompt response times, direct project proposals, architectural drawings exchange, and confidential executive consultations, message us immediately on Telegram.',
      vipFeature1: 'Real-time executive messaging & dispatch',
      vipFeature2: 'Confidential NDAs & project brief reviews',
      vipBtn: 'Message @amanman777 Now',
      formTitle: 'Send an Executive Brief',
      formSubtitle: 'Submit your inquiry details. Submitting directly connects to our Telegram desk with your pre-filled inquiry.',
      nameLabel: 'Your Name or Corporate Entity *',
      namePlaceholder: 'e.g. Sterling Capital Holding / Jonathan Vance',
      divisionLabel: 'Division of Interest',
      divisionAll: 'Full Group Synergy (All Divisions)',
      divisionArch: 'Fidelity Architects & Consulting Engineers',
      divisionBrand: 'Fidelity Branding & Advertising',
      divisionFurn: 'Fidelity Furniture & Interior Design',
      scopeLabel: 'Project Scope & Requirements *',
      scopePlaceholder: 'Describe your site, architectural goals, campaign objectives, or interior furnishing timeline...',
      submitBtn: 'Transmit Brief via Telegram (@amanman777)',
      successTitle: 'Inquiry Forwarded',
      successDesc: 'Your project brief has been formatted. If Telegram did not open automatically, click below:',
      openTelegramBtn: 'Open Telegram (@amanman777)',
      hqLabel: 'Headquarters: Financial District, Suite 400',
      emailLabel: 'corporate@fidelitybusinessgroup.com'
    },
    admin: {
      triggerBtn: 'Admin Panel (v3.0)',
      portalTitle: 'FIDELITY ADMIN PORTAL',
      authBadge: 'Authenticated Session • Firestore & Cloudinary Ready',
      lockedBadge: 'Security Clearance Required',
      loginTitle: 'Administrator Login',
      loginDesc: 'Enter administrative password to manage dynamic portfolio works, configure Firebase Firestore, and manage Cloudinary assets.',
      passwordLabel: 'Security Password',
      passwordPlaceholder: 'Enter admin password (Default: admin123)',
      unlockBtn: 'Unlock Admin Panel (v3.0)',
      defaultPassHint: 'Default credentials: admin123',
      tabCreate: 'Post New Work',
      tabManage: 'Manage Posts',
      tabFirebase: 'Firebase & Cloudinary',
      publishTitle: 'Publish New Project Work',
      publishSubtitle: 'Works are instantly published to the live portfolio gallery and stored in Firebase Firestore with Cloudinary CDN media optimization.',
      samplePresetsTitle: 'Quick-Fill Sample Presets (Cloudinary / Unsplash)',
      oneClickTest: '1-Click Test',
      fieldTitle: 'Project Title *',
      fieldSector: 'Division Sector *',
      fieldImageUrl: 'Image URL (Cloudinary Supported) *',
      cloudinaryDetected: '• Detected Cloudinary URL: Auto-optimization active (f_auto, q_auto)',
      standardUrl: '• Standard web image URL',
      livePreview: 'Live Media Preview',
      fieldDesc: 'Project Narrative / Description *',
      fieldClient: 'Client / Enterprise',
      fieldLocation: 'Location / Market',
      fieldYear: 'Year',
      publishBtn: 'Publish Project to Portfolio',
      publishingBtn: 'Publishing to Firestore...',
      publishSuccess: 'Project published successfully! Real-time reflection is active on the portfolio gallery.',
      existingTitle: 'Existing Works',
      existingSubtitle: 'View or delete works from the database. Deletions reflect instantly across the live website gallery.',
      deleteConfirm: 'Delete this project? This cannot be undone.',
      editPost: 'Edit',
      updatePostBtn: 'Update Post',
      updatingPostBtn: 'Updating in Firestore...',
      cancelEdit: 'Cancel Edit',
      editingBanner: 'Editing Existing Post',
      fieldTitleAm: 'Project Title (Amharic) *',
      fieldTitleEn: 'Project Title (English) *',
      fieldDescAm: 'Project Narrative (Amharic) *',
      fieldDescEn: 'Project Narrative (English) *',
      logOut: 'Log Out'
    },
    footer: {
      motto: 'From thought to empire!',
      desc: 'Fidelity Business Group harmonizes architectural consulting engineering, 360° corporate branding, and bespoke luxury interiors into singular institutional empires.',
      alliedTitle: 'Allied Divisions',
      navTitle: 'Navigation',
      copyright: '© 2026 Fidelity Business Group. All rights reserved.',
      adminAccess: '3.0'
    }
  }
};
