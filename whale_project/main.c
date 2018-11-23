#include<stdio.h>

int main(int number) {
  /* code */
  int day, wanted;
  int rate; //rate는 받아와야 하는 환율 ghksd
  number=0;
  printf("D-day를 입력하세요\n", );
  scanf("%d", &day);

  printf("희망 환율을 입력하세요\n", );
  scanf("%d", &wanted);
  boolean success;

  while(number<day){
    success = false;
    number++;
    if(rate== wanted){
      alarm1; //success 알람기능
      succeess = true;
      break;
    }

    if(number == day-2){
      if(rate==wanted){
        alarm1; // success
        succeess = true;
        break;
      }
      else{
          alarm2; // d-2 alarm
      }

    }

  }

  if(success == false){
      alarm3; // fail alarm
  }
  clearAll; // 모든 설정 초기화
  return 0;
}
