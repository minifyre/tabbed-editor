import silo from './util.mjs'
const {config,util}=silo
function logic(opts={})
{
	const state=util.mkState(opts)
	if(!state.file.tabs.length) state.file.tabs.push({id:util.id(),name:'untitled'})
	if(!state.view.tab) state.view.tab=state.file.tabs[0].id
	return state
}
//@todo use util.mk
logic.tabCreate=opts=>Object.assign({id:util.id(),name:'untitled'},opts)
logic.tabClose=function(state,id)
{
	const//always have one tab
	{tabs}=state.file,
	switchTabs=state.view.tab===id,
	mkTab=switchTabs&&tabs.length===1
	//@todo find a way to oneline with tabSwitch, without breaking indexes
	if(mkTab) logic.tabNew(state)
	//get replacement tab
	const i=tabs.findIndex(x=>x.id===id)
	if(!mkTab) logic.tabSwitch(state,tabs[i+1<tabs.length?i+1:i-1].id)
	//close tab
	tabs.splice(i,1)
	return state.view.tab
}
logic.tabNew=function(state,opts)
{
	const newTab=logic.tabCreate(opts)
	state.file.tabs.unshift(newTab)
	logic.tabSwitch(state,newTab.id)
	return newTab.id
}
logic.tabSwitch=function(state,id)
{
	const newTab=state.view.tab!==id
	if(newTab) state.view.tab=id
	return newTab
}
logic.toggleFullscreen=state=>state.view.fullscreen=!state.view.fullscreen
export default Object.assign(silo,{logic})