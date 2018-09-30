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
	const
	{tabs}=state,
	i=tabs.findIndex(x=>x.id===id),
	nextTabIndex=i+1<tabs.length?i+1:i-1
	//@todo simplify
	if(tabs[nextTabIndex])
	{
		state.tab=state.tabs[nextTabIndex].id
		state.tabs.splice(i,1)
	}
	else
	{
		const newTab=logic.tabCreate()
		state.tab=newTab.id
		state.tabs.splice(i,1,newTab)
	}
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