import {config,logic,output,util,v} from './output.mjs'
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

	output.rerender(editor,input)//@todo find a better way for output to access input
	//@todo have output.event derrive type from event
	if(evt2emit) output.event(editor,evt2emit.type,evt2emit)
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





input.tabClose=function(evt,editor)
{
	const
	tabs=util.findParent(target,'header').querySelector('.tabs'),
	tab=util.findParent(target,'.tab'),
	id=tab.getAttribute('for'),
	btn=tab.previousSibling,
	detail={close:id}
	btn.remove()
	tab.remove()
	if(!tabs.querySelector('[type="radio"]:checked'))
	{
		const next=tabs.querySelector('[type=radio]')
		if (next)
		{
			next.checked=true
			detail.open=next.id
		}
	}
	input.state(editor,'tab',{detail})
}
input.toggleFullscreen=function(evt,editor)
{
	const
	fullscreen=output.toggleFullscreen(target.parentElement)
	editor.setAttribute('fullscreen',fullscreen)
	input.state(editor,'fullscreen',{detail:{fullscreen}})
}
input.state=function(editor,type,evt)
{
	const
	root=editor.shadowRoot,
	fullscreen=JSON.parse(root.querySelector('header').getAttribute('fullscreen')),
	tab=(root.querySelector('.tabs :checked')||{}).id,
	tabs=[...root.querySelectorAll('.tabs label')].map(function(el)
	{
		const
		id=el.getAttribute('for'),
		//@todo regex will not work when close button uses ligatures
		name=el.innerText.replace(/^x\n/,'')
		return {id,name}
	})
	editor.state=logic({fullscreen,tab,tabs})
	if(!tab) output.tabs(editor)
	output.event(editor,type,evt)
}
export {config,input,logic,output,util,v}