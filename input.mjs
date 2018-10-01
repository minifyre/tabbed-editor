import silo from './output.mjs'
const {config,logic,output,util,v}=silo
function input(evt)
{
	const
	{target,type}=evt,
	attr=`data-${type}`,
	el=util.findParent(target,`[${attr}]`)

	if(!el) return

	const//@todo clean up evt2editor code
	editor=evt.path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	fn=el.getAttribute(attr),
	evt2emit=input[fn](evt,editor)

	output.rerender(editor)
	if(evt2emit) output.event(editor,evt2emit)
}
Object.assign(silo,{input})
input.tabClose=function(evt,editor)
{
	const
	{id}=util.findParent(evt.target,'.tab'),
	switchTabs=editor.state.tab===id,
	detail={close:id},
	newlyOpenedTabId=logic.tabClose(editor.state,id)

	if (switchTabs) detail.open=newlyOpenedTabId

	return {detail,type:'tab'}
}
input.tabNew=function(evt,editor)
{
	logic.tabNew(editor.state)
	return {detail:{open:editor.state.tab},type:'tab'}
}
input.tabSwitch=function(evt,editor)
{
	const {id}=util.findParent(evt.target,'.tab')
	if(logic.tabSwitch(editor.state,id)) return {detail:{open:id},type:'tab'}
}
input.toggleFullscreen=function(evt,editor)
{
	const fullscreen=logic.toggleFullscreen(editor.state)
	editor.setAttribute('fullscreen',fullscreen)
	return {detail:{fullscreen},type:'fullscreen'}
}
export default silo