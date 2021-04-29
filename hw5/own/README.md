做到了基本與進階要求,

yarn server後會創建log 目錄(如果不存在)

接著會產生log檔,若是檔名重複了就會用(1)(2)來取名

遊戲進行方式和要求相同,而server關閉的話,client的動作不會成功

不管是卡在start,restart,guess,server重開的話,都會從start開始寫到新的log中

而client端會維持原本卡在的介面,可以繼續進行