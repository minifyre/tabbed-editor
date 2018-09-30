import {config,logic,output,util,v} from './output.mjs'
function input(evt)
{
	const
	{target,type}=evt,
	attr=`data-${type}`,
	el=util.findParent(target,`[${attr}]`)

	if(!el) return

	const
	editor=util.evt2editor(evt),
	fn=el.getAttribute(attr),
	evt2emit=input[fn](evt)

	output.rerender(editor,input)//@todo find a better way for output to access input
	//@todo have output.event derrive type from event
	if(evt2emit) output.event(editor,evt2emit.type,evt2emit)
}
//@todo delete temp code
util.evt2editor=({path})=>path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor')
input.tabNew=function(evt)
{
	const editor=util.evt2editor(evt)
	logic.newTab(editor.state)
	return {detail:{open:editor.state.tab},type:'tab'}
}



input.tabClose=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
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
input.tabSwitch=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	tabs=util.findParent(target,'header').querySelector('.tabs'),
	prevId=tabs.querySelector(':checked').id,
	id=target.getAttribute('for')
	if (id!==prevId) input.state(editor,'tab',{detail:{open:id}})
}
input.toggleFullscreen=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
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