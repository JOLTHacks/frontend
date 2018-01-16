var allSections = [
    {
        title: 18,
        sections: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,31,32,33,34,35,36,37,38,39,"39A",40,41,42,43,44,45,46,47,48,49,81,111,112,113,114,115,116,117,118,119,151,152,153,154,155,156,157,158,175,"175a","175b","175c",176,177,178,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,223,224,225,226,227,228,229,"229A","229B","229C","229D","229E","229F",231,232,233,241,242,243,244,245,246,247,248,249,281,282,283,284,285,286,287,288,289,290,291,292,293,331,332,333,334,335,336,337,341,342,343,351,371,372,373,401,402,403,431,432,433,434,435,436,437,438,440,441,442,443,470,471,472,473,474,"474A",475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,"511A",512,513,514,521,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,700,701,702,703,704,705,706,"706a",707,708,709,710,711,"711a",712,713,714,715,716,751,752,753,754,755,756,757,758,791,792,793,794,795,796,797,798,"798A",799,831,832,833,836,837,841,842,843,844,845,846,847,848,871,872,873,874,875,876,877,878,879,880,891,892,893,894,895,896,911,912,913,914,915,916,917,921,922,923,924,925,"925A",926,"926A","926B","926C",927,928,929,930,931,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,981,982,983,984,985,986,987,1001,1002,1003,1004,1005,1006,1007,1008,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,"1028A",1029,1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1071,1072,1073,1074,1081,1082,1083,1084,1091,1092,1093,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1201,1202,1203,1204,1231,1232,1261,1262,1263,1264,1265,1301,1302,1303,1304,1305,1306,1307,1308,1341,1342,1343,1344,1345,1346,1347,1348,1349,1350,1351,1361,1362,1363,1364,1365,1366,1367,1368,1369,1381,1382,1383,1384,1385,1386,1387,1388,1389,1401,1421,1422,1423,1424,1425,1426,1427,1428,1429,1460,1461,1462,1463,1464,1465,1466,"1466A",1467,1468,1469,1470,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1521,1531,1541,1542,1543,1544,1545,1546,1547,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,"1593A",1594,1595,1596,1597,1621,1622,1623,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,"1716A","1716B","1716C","1716D","1716E",1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1751,1752,1761,1762,1791,1792,1793,1801,1821,1831,1832,1833,1834,1835,1836,1837,1838,1839,1841,1851,1852,1853,1854,1855,1856,1857,1858,1859,1860,1861,1862,1863,1864,1865,1866,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1951,1952,"1952A","1952B",1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1991,1992,1993,2031,2071,2072,2073,2074,2075,2076,2101,2102,2111,2112,2113,2114,2115,2116,2117,2118,2119,2151,2152,2153,2154,2155,2156,2157,2191,2192,2193,2194,2195,2196,2197,2198,2199,2231,2232,2233,2234,2235,2236,2237,2241,2242,2243,2244,2245,2246,2247,2248,2250,2251,"2251A",2252,"2252A","2252B","2252C",2253,2254,2255,2256,2257,"2257A",2258,"2258A","2258B","2258C","2258D","2258E",2259,2260,"2260A",2261,"2261A",2262,2263,2264,2265,"2265A",2266,2271,2272,2273,2274,2275,2276,2277,2278,2279,2280,"2280a",2281,"2281a","2282A","2282B",2283,2284,2285,2290,2291,2292,2293,2311,2312,2313,2314,2315,2316,2317,2318,2319,"2319A","2319B",2320,2321,2322,2323,2325,2326,2327,2328,2331,2332,"2332a","2332b","2332c","2332d","2332e","2332f","2332g","2332h","2332i",2333,2334,2335,2336,2337,2338,2339,"2339A","2339B","2339C","2339D",2340,"2340A","2340B",2341,2342,2343,2344,2345,2346,2381,2382,2383,2384,2385,2386,2387,2388,2389,2390,2391,2421,2422,2423,2424,2425,2426,2427,2428,2441,2442,2510,2511,2512,2513,2514,2515,2516,2517,2518,2519,2520,2521,2522,2701,2702,2703,2704,2705,2706,2707,2708,2709,2710,2711,2712,2721,2722,2723,2724,2725,3001,3002,3003,3004,3005,3006,"3006A",3007,3008,3009,3010,3011,3012,3013,3014,3041,3042,3043,3044,3045,3046,3047,3048,3049,3050,3051,3052,3053,3054,3055,3056,"3056A",3057,3058,3059,3060,3061,3062,3063,3064,3071,3072,3073,3074,3075,3076,3077,3101,3102,3103,"3103a",3104,3105,3106,3107,3108,3109,3110,3111,3112,3113,3114,3115,3116,3117,3118,3121,3122,3123,3124,3125,3126,3127,3141,3142,3143,3144,3145,3146,3147,3148,3149,3150,"3150a",3151,3152,3153,3154,3155,3156,3161,3162,3163,3164,3165,3166,3167,3168,3169,3170,3171,3172,3173,3174,3181,3182,3183,3184,3185,3186,3187,3188,3189,3190,3191,3192,3193,3194,3195,3196,3231,3232,3233,3234,3235,3236,3237,3238,3239,3240,3241,3242,3243,3244,3261,3262,3263,3264,3265,3266,3267,3271,3272,3273,3281,3282,3283,3284,3285,3286,3287,3288,3289,3290,3291,3292,3293,3294,3295,3296,3297,3298,3299,3300,3301,3321,3322,3323,3331,3332,3333,3334,3361,3362,3363,3364,3365,3366,3367,3401,3402,3431,3432,3433,3434,3435,3436,3437,3438,3439,3440,3441,3442,3443,3444,3445,3446,3481,3482,3483,3484,3485,3486,"3486A",3487,3488,3489,3490,3491,3492,3493,3494,3495,3496,3497,3498,3499,3500,3501,3502,3503,3504,3505,3506,3507,3508,3509,3510,3511,3512,3521,3522,3523,3524,3525,3526,3527,3528,3531,3532,3551,3552,3553,3554,3555,3556,3557,3558,3559,3561,3562,3563,3564,3565,3566,3571,3572,3573,3574,3581,3582,3583,3584,3585,3586,3591,3592,3593,3594,3595,3596,3597,3598,3599,3600,"3600A",3601,3602,3603,3604,3605,3606,3607,3608,3611,3612,3613,"3613A",3614,3615,3621,3622,3623,3624,3625,3626,3651,3661,3662,3663,"3663A",3664,3665,3666,3667,3668,3669,3670,3671,3672,3673,3681,3682,3691,3692,3693,3731,3732,3733,3734,3735,3736,3737,3738,3739,3740,3741,3742,3771,3772,4001,4002,4003,4004,4005,4006,4007,4008,4009,4010,4011,4012,4013,4014,4041,4042,4043,4044,4045,4046,4047,4048,4049,4081,4082,4083,4084,4086,4100,4101,4102,4103,4104,4105,4106,"4106A",4107,4108,4109,4110,4111,4112,4113,4114,4115,4121,4122,4123,4124,4125,4126,4127,4128,4129,4161,4201,4241,4242,4243,4244,4245,4246,4247,4248,4251,4281,4282,4283,4285,4321,4351,4352,4353,5001,5002,5003,5005,5007,5010,5031,5032,5033,5034,5035,5036,5037,5038,5039,5040,5041,5042,6001,6002,6003,6004,6005]
    }
]


