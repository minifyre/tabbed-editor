input.tabClose=function(evt,editor)
{
	const
	{id}=util.findParent(evt.target,'.tab'),
	switchTabs=editor.state.view.tab===id,
	detail={close:id},
	newlyOpenedTabId=logic.tabClose(editor.state,id)

	if (switchTabs) detail.open=newlyOpenedTabId

	return {detail,type:'tab'}
}
input.tabNew=function(evt,editor)
{
	logic.tabNew(editor.state)
	return {detail:{open:editor.state.view.tab},type:'tab'}
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