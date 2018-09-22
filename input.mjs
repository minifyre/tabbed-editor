import {config,logic,output,util} from './output.mjs'
function input(el,type)
{
	const sel=`[data-${type}]`
	el.addEventListener(type,function(evt)
	{
		const
		{target}=evt,
		el=util.findParent(target,sel)
		if(!el) return
		const fn=el.getAttribute(`data-${type}`)
		input[fn](evt)
	})
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
//@todo rename to be more consistent with emmited evt.detail (new=open)
input.tabNew=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	tabs=util.findParent(target,'header').querySelector('.tabs'),
	id=util.id()
	tabs.prepend(...output.tab({id}))
	input.state(editor,'tab',{detail:{open:id}})
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
export {config,input,logic,output,util}