input.tabClose=function(editor,evt)
{
	const
	{id}=util.findParent(evt.target,'.tab'),
	switchTabs=editor.state.view.tab===id,
	detail={close:id},
	newlyOpenedTabId=logic.tabClose(editor.state,id)

	if (switchTabs) detail.open=newlyOpenedTabId

	return {detail,type:'tab'}
}
input.tabNew=function(editor,evt)
{
	logic.tabNew(editor.state)
	return {detail:{open:editor.state.view.tab},type:'tab'}
}
input.tabSwitch=function(editor,evt)
{
	const {id}=util.findParent(evt.target,'.tab')
	if(logic.tabSwitch(editor.state,id)) return {detail:{open:id},type:'tab'}
}
input.toggleFullscreen=function(editor,evt)
{
	const fullscreen=logic.toggleFullscreen(editor.state)
	editor.setAttribute('fullscreen',fullscreen)
	return {detail:{fullscreen},type:'fullscreen'}
}