import config from './config.mjs'
import util from './util.mjs'
function logic(opts={})
{
	const state=Object.assign({},config.state,opts)
	if(!state.tabs.length) state.tabs.push({id:util.id(),name:'untitled'})
	if(!state.tab) state.tab=state.tabs[0].id
	return state
}
logic.tabNew=function(state,newTab={id:util.id(),name:'untitled'})
{
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