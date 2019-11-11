var   lunarInfo=new   Array(   
  2  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,   
  3  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,   
  4  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,   
  5  0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,   
  6  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,   
  7  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,   
  8  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,   
  9  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,   
 10  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,   
 11  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,   
 12  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,   
 13  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,   
 14  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,   
 15  0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,   
 16  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)   
 17    
 18  var   solarMonth=new   Array(31,28,31,30,31,30,31,31,30,31,30,31);   
 19  var   Gan=new   Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");   
 20  var   Zhi=new   Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");   
 21  var   Animals=new   Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");   
 22  var   solarTerm   =   new   Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至")   
 23  var   sTermInfo   =   new   Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758)   
 24  var   nStr1   =   new   Array('日','一','二','三','四','五','六','七','八','九','十')   
 25  var   nStr2   =   new   Array('初','十','廿','卅','　')   
 26  var   monthName   =   new   Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");   
 27    
 28  /*****************************************************************************   
 29                                                                              日期计算   
 30  *****************************************************************************/   
 31    
 32  //======================================   传回农历   y年的总天数   
 33  function   lYearDays(y)   {   
 34        var   i,   sum   =   348   
 35        for(i=0x8000;   i>0x8;   i>>=1)   sum   +=   (lunarInfo[y-1900]   &   i)?   1:   0   
 36        return(sum+leapDays(y))   
 37  }   
 38    
 39  //======================================   传回农历   y年闰月的天数   
 40  function   leapDays(y)   {   
 41        if(leapMonth(y))     return((lunarInfo[y-1900]   &   0x10000)?   30:   29)   
 42        else   return(0)   
 43  }   
 44    
 45  //======================================   传回农历   y年闰哪个月   1-12   ,   没闰传回   0   
 46  function   leapMonth(y)   {   
 47        return(lunarInfo[y-1900]   &   0xf)   
 48  }   
 49    
 50  //======================================   传回农历   y年m月的总天数   
 51  function   monthDays(y,m)   {   
 52        return(   (lunarInfo[y-1900]   &   (0x10000>>m))?   30:   29   )   
 53  }   
 54    
 55  //======================================   算出农历,   传入日期物件,   传回农历日期物件   
 56  //                                                                               该物件属性有   .year   .month   .day   .isLeap   .yearCyl   .dayCyl   .monCyl   
 57  function   Lunar(objDate)   {   
 58    
 59        var   i,   leap=0,   temp=0   
 60        var   baseDate   =   new   Date(1900,0,31)   
 61        var   offset       =   (objDate   -   baseDate)/86400000   
 62    
 63        this.dayCyl   =   offset   +   40   
 64        this.monCyl   =   14   
 65    
 66        for(i=1900;   i<2050   &&   offset>0;   i++)   {   
 67              temp   =   lYearDays(i)   
 68              offset   -=   temp   
 69              this.monCyl   +=   12   
 70        }   
 71    
 72        if(offset<0)   {   
 73              offset   +=   temp;   
 74              i--;   
 75              this.monCyl   -=   12   
 76        }   
 77    
 78        this.year   =   i   
 79        this.yearCyl   =   i-1864   
 80    
 81        leap   =   leapMonth(i)   //闰哪个月   
 82        this.isLeap   =   false   
 83    
 84        for(i=1;   i<13   &&   offset>0;   i++)   {   
 85              //闰月   
 86              if(leap>0   &&   i==(leap+1)   &&   this.isLeap==false)   
 87                    {   --i;   this.isLeap   =   true;   temp   =   leapDays(this.year);   }   
 88              else   
 89                    {   temp   =   monthDays(this.year,   i);   }   
 90    
 91              //解除闰月   
 92              if(this.isLeap==true   &&   i==(leap+1))   this.isLeap   =   false   
 93    
 94              offset   -=   temp   
 95              if(this.isLeap   ==   false)   this.monCyl   ++   
 96        }   
 97    
 98        if(offset==0   &&   leap>0   &&   i==leap+1)   
 99              if(this.isLeap)   
100                    {   this.isLeap   =   false;   }   
101              else   
102                    {   this.isLeap   =   true;   --i;   --this.monCyl;}   
103    
104        if(offset<0){   offset   +=   temp;   --i;   --this.monCyl;   }   
105    
106        this.month   =   i   
107        this.day   =   offset   +   1   
108  }   
109    
110  //==============================传回国历   y年某m+1月的天数   
111  function   solarDays(y,m)   {   
112        if(m==1)   
113              return(((y%4   ==   0)   &&   (y%100   !=   0)   ||   (y%400   ==   0))?   29:   28)   
114        else   
115              return(solarMonth[m])   
116  }   
117  //==============================   传入   offset   传回干支,   0=甲子   
118  function   cyclical(num)   {   
119        return(Gan[num%10]+Zhi[num%12])   
120  }   
121    
122  //======================   中文日期   
123  function   cDay(d){   
124        var   s;   
125    
126        switch   (d)   {   
127              case   10:   
128                    s   =   '初十';   break;   
129              case   20:   
130                    s   =   '二十';   break;   
131                    break;   
132              case   30:   
133                    s   =   '三十';   break;   
134                    break;   
135              default   :   
136                    s   =   nStr2[Math.floor(d/10)];   
137                    s   +=   nStr1[d%10];   
138        }   
139        return(s);   
140  }   
141  //======================   中文月份   
142  function   cMonth(m){   
143        var   s;   
144    
145        switch   (m)   {   
146              case   1:   
147                    s   =   '正月';   break;   
148              case   2:   
149                    s   =   '二月';   break;   
150              case   3:   
151                    s   =   '三月';   break;   
152              case   4:   
153                    s   =   '四月';   break;   
154              case   5:   
155                    s   =   '五月';   break;   
156              case   6:   
157                    s   =   '六月';   break;   
158              case   7:   
159                    s   =   '七月';   break;   
160              case   8:   
161                    s   =   '八月';   break;   
162              case   9:   
163                    s   =   '九月';   break;   
164              case   10:   
165                    s   =   '十月';   break;   
166              case   11:   
167                    s   =   '十一月';   break;   
168              case   12:   
169                    s   =   '十二月';   break;   
170              default   :   
171                    break;   
172        }   
173        return(s);   
174  }   
175    
176  function   GetLunarDay(YearStr,MonthStr,DayStr)   
177  {   
178    var   sDObj=new   Date(parseInt(YearStr),parseInt(MonthStr)-1,parseInt(DayStr))   
179    var   lDObj=new   Lunar(sDObj)           //农历   
180    return   cMonth(lDObj.month)+cDay(lDObj.day);   
181  }  