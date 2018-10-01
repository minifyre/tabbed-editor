import config from './config.mjs'
import util from './util.mjs'
function logic(opts={})
{
	const state=Object.assign({},config.state,opts)
	if(!state.tabs.length) state.tabs.push({id:util.id(),name:'untitled'})
	if(!state.tab) state.tab=state.tabs[0].id
	return state
}
const silo={config,logic,util}
//@todo use util.mk
logic.tabCreate=opts=>Object.assign({id:util.id(),name:'untitled'},opts)
logic.tabClose=function(state,id)
{
	const//always have one tab
	{tabs}=state,
	switchTabs=state.tab===id,
	mkTab=switchTabs&&tabs.length===1
	//@todo find a way to oneline with tabSwitch, without breaking indexes
	if(mkTab) logic.tabNew(state)
	//get replacement tab
	const i=tabs.findIndex(x=>x.id===id)
	if(!mkTab) logic.tabSwitch(state,tabs[i+1<tabs.length?i+1:i-1].id)
	//close tab
	tabs.splice(i,1)
	return state.tab
}
logic.tabNew=function(state,opts)
{
	const newTab=logic.tabCreate(opts)
	state.tabs.unshift(newTab)
	logic.tabSwitch(state,newTab.id)
	return newTab.id
}
logic.tabSwitch=function(state,id)
{
	const newTab=state.tab!==id
	if(newTab) state.tab=id
	return newTab
}
logic.toggleFullscreen=state=>state.fullscreen=!state.fullscreen
export default silo