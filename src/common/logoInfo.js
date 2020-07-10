const cgSrc = '../../static/image/1_cg/'
const kcSrc = '../../static/image/2_kc/'
const ypSrc = '../../static/image/3_yp/'
const xcSrc = '../../static/image/4_xc/'
const blSrc = '../../static/image/5_bl/'
const fsSrc = '../../static/image/6_fs/'
const hlSrc = '../../static/image/7_hl/'
const ylSrc = '../../static/image/8_yl/'

const logoInfo = {
  cg: [
    {
      src: cgSrc + 'A2_35~老南昌.png',
      id: 'A5/A2_35'
    },
    {
      src: cgSrc + 'A43~牛造の场.png',
      id: 'A5/A1_43 牛造の场'
    },
    {
      src: cgSrc + 'A47~松本町.png',
      id: 'A5/A1_47 松本町'
    },
    {
      src: cgSrc + 'A50~怒二哥.png',
      id: 'A6/A2_50'
    },
    {
      src: cgSrc + 'A53~独椒戏.png',
      id: 'A6/A1_53 独椒戏'
    },
    {
      src: cgSrc + 'A65~洒吞料理.png',
      id: 'A6/A1_65 酒吞料理'
    },
    {
      src: cgSrc + 'A92~PIZZAHUT.png',
      id: 'A8/A1_92 必胜客'
    },
    {
      src: cgSrc + 'B1_13~吾邀.png',
      id: 'B2/B1_13 吾邀'
    },
    {
      src: cgSrc + 'B1_14~鱼和蛙的故事.png',
      id: 'B2/B1_14 鱼和蛙的故事'
    },
    {
      src: cgSrc + 'B1_19~九宫阁火锅.png',
      id: 'B2/B1_19 九宫阁火锅'
    },
    {
      src: cgSrc + 'B1_20~蛙三.png',
      id: 'B4/B1_20 蛙三牛蛙'
    },
    {
      src: cgSrc + 'B1_21~爱撒椒.png',
      id: 'B4/B1_21 爱撒椒'
    },
    {
      src: cgSrc + 'B1_53~活鱼•跳蛙.png',
      id: 'B8/B1_53 活鱼跳蛙'
    },
    {
      src: cgSrc + 'B1_69~大斌家.png',
      id: 'B10/B1_69 大斌家串串火锅'
    },
    {
      src: cgSrc + 'B2_3_~味之绝.png',
      id: 'B1/B2_3'
    },
    {
      src: cgSrc + 'B2_10_~牛签签.png',
      id: 'B2_10_'
    },
    {
      src: cgSrc + 'B2_16_~蛙三泡椒牛蛙.png',
      id: 'B2/B2_10'
    },
    {
      src: cgSrc + 'B2_19_~小黑牛烤肉.png',
      id: 'B5/B2_19'
    }
  ],
  kc: [
    {
      src: kcSrc + 'A2_11~牛男手造.png',
      id: 'A2/A2_11'
    },
    {
      src: kcSrc + 'A2_27~长野料理.png',
      id: 'A4/A2_27'
    },
    {
      src: kcSrc + 'A2_36~赣味小馆.png',
      id: 'A5/A2_36'
    },
    {
      src: kcSrc + 'A2_45~来湘汇.png',
      id: 'A6/A2_45'
    },
    {
      src: kcSrc + 'A2_49~重庆酸辣粉小面.png',
      id: 'A6/A2_49'
    },
    {
      src: kcSrc + 'A4~蚝鲍屋.png',
      id: 'A1/A1_4'
    },
    {
      src: kcSrc + 'A23~川卤大叔卤粉王.png',
      id: 'A3/A1_23 川卤大叔'
    },
    {
      src: kcSrc + 'A24~三爷粉饭.png',
      id: 'A3/A1_24 三爷炒饭'
    },
    {
      src: kcSrc + 'A25~庙东排骨.png',
      id: 'A3/A1_25 庙东排骨'
    },
    {
      src: kcSrc + 'A28~龙门花甲.png',
      id: 'A4/A1_28 龙门花甲'
    },
    {
      src: kcSrc + 'A33~叶记粥粉面錧.png',
      id: 'A4/A1_33 粥粉面馆'
    },
    {
      src: kcSrc + 'A45~万方圆.png',
      id: 'A5/A1_45 万方圆拌粉'
    },
    {
      src: kcSrc + 'A66~寻桂味花甲粉.png',
      id: 'A6/A1_66 花甲粉'
    },
    {
      src: kcSrc + 'A68~陕夫子.png',
      id: 'A6/A1_68 西安味道'
    },
    {
      src: kcSrc + 'A82~罗先生.png',
      id: 'A7/A1_82 罗先生私房炸酱面馆'
    },
    {
      src: kcSrc + 'A83~金筷子麻辣烫.png',
      id: 'A7/A1_83 金筷子'
    },
    {
      src: kcSrc + 'A84~谭记水煮鱼.png',
      id: 'A7/A1_84 谭记水煮'
    },
    {
      src: kcSrc + 'B1_8~贝克汉堡.png',
      id: 'B2/B1_8 贝克汉堡'
    }
  ],
  yp: [
    {
      src: ypSrc + 'A1~星巴克.png',
      id: 'A1/A1_1'
    },
    {
      src: ypSrc + 'A5~桃夭.png',
      id: 'A1/A1_5'
    },
    {
      src: ypSrc + 'A19~汴京茶寮.png',
      id: 'A3/A1_19 汴京茶寮'
    },
    {
      src: ypSrc + 'A36~麦吉.png',
      id: 'A4/A1_36 machi machi'
    },
    {
      src: ypSrc + 'A58~浮生云.png',
      id: 'A6/A1_58 浮生云'
    },
    {
      src: ypSrc + 'A63~厝内小眷村.png',
      id: 'A6/A1_63 厝内小眷村'
    },
    {
      src: ypSrc + 'A64~一芳.png',
      id: 'A6/A1_64 一芳水果茶'
    },
    {
      src: ypSrc + 'A67~一杯酸奶牛.png',
      id: 'A6/A1_67 一杯酸牛奶'
    },
    {
      src: ypSrc + 'A73~悸动.png',
      id: 'A7/A1_73 悸动'
    },
    {
      src: ypSrc + 'A81~黑泷堂.png',
      id: 'A7/A1_81 黑泷堂'
    },
    {
      src: ypSrc + 'A86~锟茶.png',
      id: 'A8/A1_86 琨茶'
    },
    {
      src: ypSrc + 'A87~黄式.png',
      id: 'A8/A1_87 黄氏'
    },
    {
      src: ypSrc + 'A88~书亦烧仙草.png',
      id: 'A8/A1_88 书亦烧仙草'
    },
    {
      src: ypSrc + 'A90~苦茗.png',
      id: 'A8/A1_90 古茗'
    },
    {
      src: ypSrc + 'B1_2~蒲公英.png',
      id: 'B1/B1_2 蒲公英'
    },
    {
      src: ypSrc + 'B1_7~一点点.png',
      id: 'B1/B1_7 一点点'
    },
    {
      src: ypSrc + 'B1_11~鲜之醇.png',
      id: 'B2/B1_11 鲜之醇'
    },
    {
      src: ypSrc + 'B1_16~澜熊鲜奶.png',
      id: 'B2/B1_16 澜熊鲜奶'
    }
  ],
  xc: [
    {
      src: xcSrc + 'A2_17~榴芒聚点.png',
      id: 'A3/A2_17'
    },
    {
      src: xcSrc + 'A2_42~肉蟹煲.png',
      id: 'A6/A2_42'
    },
    {
      src: xcSrc + 'A2_46~海鲜咖.png',
      id: 'A6/A2_46'
    },
    {
      src: xcSrc + 'A17~千喵果茶.png',
      id: 'A3/A1_17 千喵果茶'
    },
    {
      src: xcSrc + 'A20~正新鸡排.png',
      id: 'A3/A1_20 正新鸡排'
    },
    {
      src: xcSrc + 'A21~长沙臭豆腐.png',
      id: 'A3/A1_21 小吃店'
    },
    {
      src: xcSrc + 'A22~御品香.png',
      id: 'A3/A1_22 御品香'
    },
    {
      src: xcSrc + 'A32~道明小吃.png',
      id: 'A4/A1_32 道明小吃'
    },
    {
      src: xcSrc + 'A49~一品生煎.png',
      id: 'A5/A49 一品生煎'
    },
    {
      src: xcSrc + 'A51~宋记烧饼.png',
      id: 'A5/A1_51 现切鲜水果'
    },
    {
      src: xcSrc + 'A56~大重庆.png',
      id: 'A6/A1_56 大重庆'
    },
    {
      src: xcSrc + 'A57~煌上煌.png',
      id: 'A6/A1_57 煌上煌'
    },
    {
      src: xcSrc + 'A59~杨记板栗.png',
      id: 'A6/A1_59 杨记板栗'
    },
    {
      src: xcSrc + 'A62~海盗芝士棒.png',
      id: 'A6/A1_62 海盗芝士棒'
    },
    {
      src: xcSrc + 'A72~鱿鸡兄弟.png',
      id: 'A7/A1_72 鱿鸡兄弟'
    },
    {
      src: xcSrc + 'A75~围炉锅盔.png',
      id: 'A7/A1_75 围炉锅盔 港式点心'
    },
    {
      // src: xcSrc + 'A76~港式点心.png',
      // id: 'A76'
      src: kcSrc + 'A28~龙门花甲.png',
      id: 'A4/A1_28 龙门花甲'
    },
    {
      src: xcSrc + 'A78~吴酥生.png',
      id: 'A7/A1_78 吴酥生'
    }
  ],
  bl: [
    {
      src: blSrc + 'A2_62~琴儿全球购.png',
      id: 'A7/A2_62'
    },
    {
      src: blSrc + 'A2~港隆汇.png',
      id: 'A1/A1_2'
    },
    {
      src: blSrc + 'A69~乐豆家.png',
      id: 'A6/A1_69 乐豆家'
    },
    {
      src: blSrc + 'A77~搬牙大洲錧.png',
      id: 'A7/A1_77 搬牙大洲馆'
    },
    {
      src: blSrc + 'B1_6~乐豆家.png',
      id: 'B1/B1_6 乐豆家'
    },
    {
      src: blSrc + 'B1_15~有家便利店.png',
      id: 'B2/B1_15 有家便利店'
    }
  ],
  fs: [
    {
      src: fsSrc + 'A2_30~屈臣氏.png',
      id: 'A5/A2_30'
    },
    {
      src: fsSrc + 'A2_31~海澜之家.png',
      id: 'A5/A2_31'
    },
    {
      src: fsSrc + 'A3~BingoKind.png',
      id: 'A1/A1_3'
    },
    {
      src: fsSrc + 'A8~宝岛眼睛.png',
      id: 'A1/A1_8'
    },
    {
      src: fsSrc + 'A9~Ann.png',
      id: 'A2/A1_9 Ann'
    },
    {
      src: fsSrc + 'A10~Boom Boom.png',
      id: 'A2/A1_10 BOOM BOOM'
    },
    {
      src: fsSrc + 'A11~奢侈品回收寄卖.png',
      id: 'A2/A1_11 UST'
    },
    {
      src: fsSrc + 'A13~SEPHORA.png',
      id: 'A2/A1_13 SEPHORA'
    },
    {
      src: fsSrc + 'A14~PRESIDENT OPTICAL.png',
      id: 'A3/A1_14 总统眼镜'
    },
    {
      src: fsSrc + 'A15~百视通.png',
      id: 'A3/A1_15 百视通'
    },
    {
      src: fsSrc + 'A16~QUEEN HOUSE.png',
      id: 'A3/A1_16 QUEEN HOUSE'
    },
    {
      src: fsSrc + 'A18~向日葵小班.png',
      id: 'A3/A1_18 向日葵小班'
    },
    {
      src: fsSrc + 'A30~MISS LEE.png',
      id: 'A4/A1_30 Miss Lee'
    },
    {
      src: fsSrc + 'A35~韩潮饰界.png',
      id: 'A4/A1_35 韩潮饰界'
    },
    {
      src: fsSrc + 'A37~佳视特眼镜.png',
      id: 'A4/A1_37 佳视特眼镜'
    },
    {
      src: fsSrc + 'A39~橘子郡.png',
      id: 'A4/A1_39 橘子郡'
    },
    {
      src: fsSrc + 'A40~米兰站.png',
      id: 'A4/A1_40 米兰站'
    },
    {
      src: fsSrc + 'A42~红尘优品.png',
      id: 'A5/A1_42 练饰优品'
    }
  ],
  hl: [
    {
      src: hlSrc + 'A2_3~喜发造型.png',
      id: 'A1/A2_3'
    },
    {
      src: hlSrc + 'A2_5~姿甲殿.png',
      id: 'A1/A2_5'
    },
    {
      src: hlSrc + 'A2_6~痘院士.png',
      id: 'A1/A2_6'
    },
    {
      src: hlSrc + 'A2_7~颜如玉.png',
      id: 'A2/A2_7'
    },
    {
      src: hlSrc + 'A2_14~艾尔造型.png',
      id: 'A3/A2_14'
    },
    {
      src: hlSrc + 'A2_16~慢时光 私人订制.png',
      id: 'A3/A2_16'
    },
    {
      src: hlSrc + 'A2_21~俪影皇后.png',
      id: 'A4/A2_21'
    },
    {
      src: hlSrc + 'A2_22~格格玛颜艺圈.png',
      id: 'A4/A2_22'
    },
    {
      src: hlSrc + 'A2_24~only  buauty.png',
      id: 'A4/A2_24'
    },
    {
      src: hlSrc + 'A2_25~莫寇形象.png',
      id: 'A4/A2_25'
    },
    {
      src: hlSrc + 'A2_26~OMG.png',
      id: 'A4/A2_26'
    },
    {
      src: hlSrc + 'A2_34~鳝当家.png',
      id: 'A5/A2_34'
    },
    {
      src: hlSrc + 'A2_40~发缘美学.png',
      id: 'A6/A2_40'
    },
    {
      src: hlSrc + 'A2_53~痣缘宫.png',
      id: 'A7/A2_53'
    },
    {
      src: hlSrc + 'A2_54~欧黎美发.png',
      id: 'A7/A2_54'
    },
    {
      src: hlSrc + 'A2_58~贵人手美甲.png',
      id: 'A7/A2_58'
    },
    {
      src: hlSrc + 'A2_59~绅缦.png',
      id: 'A7/A2_59'
    },
    {
      src: hlSrc + 'A2_60~名妆坊.png',
      id: 'A7/A2_60'
    }
  ],
  yl: [
    {
      src: ylSrc + 'A2_9~米拾言.png',
      id: 'A2/A2_9'
    },
    {
      src: ylSrc + 'A2_15~芳禾陶艺.png',
      id: 'A3/A2_15'
    },
    {
      src: ylSrc + 'A2_61~拾光陶吧.png',
      id: 'A7/A2_61'
    },
    {
      src: ylSrc + 'A46~鲜花.png',
      id: 'A5/A1_46 花店'
    },
    {
      src: ylSrc + 'A52~膜术师.png',
      id: 'A6/A1_52 膜术师'
    },
    {
      src: ylSrc + 'A85~李人蒸汽.png',
      id: 'A7/A1_85 唐人蒸汽'
    },
    {
      src: ylSrc + 'B2_2_~蒸汽博雾馆.png',
      id: 'B1/B2_2'
    },
    {
      src: ylSrc + 'B2_8_~beachcomber.png',
      id: 'B2/B1_8 贝克汉堡'
    },
    {
      src: ylSrc + 'B2_33_~美吉姆.png',
      id: 'B7/B2_33'
    }
  ]
}

export default logoInfo