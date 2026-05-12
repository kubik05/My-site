let quests = [
  {text:"Собери 5 урожая",need:5,progress:0,reward:50}
];

function openQuests(){
  show(JSON.stringify(quests,null,2));
}
