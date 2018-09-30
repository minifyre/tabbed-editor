import config from './config.mjs'
import util from './util.mjs'
function logic(opts={})
{
	const state=Object.assign({},config.state,opts)
	if(!state.tabs.length) state.tabs.push({id:util.id(),name:'untitled'})
	if(!state.tab) state.tab=state.tabs[0].id
	return state
}
//@todo use util.mk
logic.tabCreate=opts=>Object.assign({id:util.id(),name:'untitled'},opts)
logic.tabClose=function(state,id)
{
	const//always have one tab
	switchTabs=state.tab===id,
	mkTab=switchTabs&&state.tabs.length===1
	if(mkTab) logic.tabNew(state)
	//get replacement tab
	const i=tabs.findIndex(x=>x.id===id)
	if(!mkTab) tabSwitch(state,state.tabs[i+1<tabs.length?i+1:i-1].id)
	//close tab
	state.tabs.splice(i,1)
	return state.tab
}
logic.tabNew=function(state,opts)
{
	const newTab=logic.tabCreate(opts)
	state.tabs.unshift(newTab)
	logic.tabSwitch(state,newTab.id)
}
logic.tabSwitch=function(state,id)
{
	const newTab=state.tab!==id
	if(newTab) state.tab=id
	return newTab
}
export {config,logic,util}