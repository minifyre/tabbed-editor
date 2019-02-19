input.appSwitch=async function(sandbox,evt)
{
	logic.toggleAppSelection(sandbox.state)

	const
	app=evt.target.getAttribute('data-app'),
	url=config.apps[app]

	if(typeof url!=='string') sandbox.state.view.app=app

	const {default:lib}=await import(url+'index.js')

	await lib()

	sandbox.state.view.app=app
}

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

input.toggleAppSelection=function(sandbox)
{
	logic.toggleAppSelection(sandbox.state)
}
input.toggleFullscreen=function(editor,evt)
{
	const fullscreen=logic.toggleFullscreen(editor.state)
	editor.setAttribute('fullscreen',fullscreen)
	return {detail:{fullscreen},type:'fullscreen'}
}