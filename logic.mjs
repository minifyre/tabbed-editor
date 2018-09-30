import config from './config.mjs'
import util from './util.mjs'
function logic(opts={})
{
	const state=Object.assign({},config.state,opts)
	if(!state.tabs.length) state.tabs.push({id:util.id(),name:'untitled'})
	if(!state.tab) state.tab=state.tabs[0].id
	return state
}
logic.newTab=function(state,newTab={id:util.id(),name:'untitled'})
{
	state.tabs.unshift(newTab)
	state.tab=newTab.id
}
export {config,logic,util}