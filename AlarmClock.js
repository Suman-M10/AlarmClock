let display=document.getElementById("clock");
const audio=new Audio('assets/alarmAudio.mp3');
const alarmlist=document.querySelector('#alarmList');
audio.loop=true;
let alarms=[];//list of alarms
let alarmTime=null;
let timeToAlarm=null;
//Function to display the time and ring the alarm.
function UpdateTime(){
    const date=new Date();
    const hour=formatTime(date.getHours());
    const minutes=formatTime(date.getMinutes());
    const seconds=formatTime(date.getSeconds());
    display.innerText= hour +':'+ minutes +':'+ seconds;
    let arr1=[];
    arr1[0]=formatTime(date.getHours());
    arr1[1]=formatTime(date.getMinutes());
    if(alarms.includes(String(arr1))&&date.getSeconds()==0 ){
        alert('Alarm Ringing!');
        audio.play();
    }
};
//Function to add '0' if time is in single digit.
function formatTime(time){
    if (time<10){
    return '0'+time;
    }
    return time;
};
//Function to update the time in every 1 second.
setInterval(UpdateTime,1000);
//Function to get the value from the Input field.
function setAlarmTime(value){
    alarmTime=value;

}
//function to set a new alarm.
function setAlarm(){
    if(alarmTime){
        let current=new Date();
        timeToAlarm=new Date(alarmTime);
        let arr=[];
        arr[0]=formatTime(timeToAlarm.getHours());
        arr[1]=formatTime(timeToAlarm.getMinutes());
        if (!(alarms.includes(String(arr)))){
            console.log(alarms);
            alarms.push(String(arr));
            //creating new HTML elements to create the alarm list.
            const newAlarm=document.createElement('li');
            const newAlarmTime=document.createElement('p');
            const deleteButton=document.createElement('button');
            deleteButton.setAttribute('id','deleteButton');
            deleteButton.innerHTML='Delete';
            //delete an alarm
            deleteButton.addEventListener('click',function(){
                let temp=[];
                temp[0]=newAlarmTime.innerHTML.slice(0,2);
                temp[1]=newAlarmTime.innerHTML.slice(3,5);
                let alarmToDelete=alarms.indexOf(String(temp));
                delete alarms[alarmToDelete];
                console.log(alarms);
                alarmlist.removeChild(newAlarm);
            });
            newAlarmTime.innerHTML=formatTime(timeToAlarm.getHours())+':'+formatTime(timeToAlarm.getMinutes());
            //adding parent child relation to the newly created elements.
            alarmlist.appendChild(newAlarm);
            newAlarm.appendChild(newAlarmTime);
            newAlarm.appendChild(deleteButton);
        }
        else{
            alert('Alarm already set at given time!');
        }
    }
};
//function to stop the ringing alarm
function clearAlarm(){
    audio.pause();
}