// chrome.commands.onCommand.addListener((c) => {
//   switch(c){
//   case "command1":
//     chrome.tabs.create({url: "https://www.wikipedia.org/"}, ()=>{});
//     break;
//   case "command2":
//     chrome.tabs.create({url: "https://www.google.com/"}, ()=>{});
//     break;
//   case "command3":
//     chrome.tabs.create({url: "https://www.buildnship.in/"}, ()=>{});
//     break;
//   }

// });

chrome.commands.onCommand.addListener((command)=>{
  chrome.tabs.create({url:chrome.runtime.getURL('popup.html')}, (tab,w)=>{
    console.log(tab)
  })
})

