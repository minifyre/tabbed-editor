import {output,util} from './tabbed.output.mjs'
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
	//@todo open a new tab if the closed tab was the open one
	if(!tabs.querySelector('[type="radio"]:checked'))
	{
		const next=tabs.querySelector('[type=radio]')
		next.checked=true
		detail.open=next.id
	}
	editor.dispatchEvent(new CustomEvent('tab',{detail}))
}
//@todo renaem to be more consistent with emmited evt.detail (new=open)
input.tabNew=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	tabs=util.findParent(target,'header').querySelector('.tabs'),
	id=util.id(),
	[btn,label]=output.tab({id})
	tabs.prepend(label)
	tabs.prepend(btn)
	editor.dispatchEvent(new CustomEvent('tab',{detail:{open:id}}))
}
input.tabSwitch=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	tabs=util.findParent(target,'header').querySelector('.tabs'),
	prevId=tabs.querySelector(':checked').id,
	id=target.getAttribute('for')
	if (id===prevId) return
	editor.dispatchEvent(new CustomEvent('tab',{detail:{open:id}}))
}
input.toggleFullscreen=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	fullscreen=output.toggleFullscreen(target.parentElement)
	editor.setAttribute('fullscreen',fullscreen)
	editor.dispatchEvent(new CustomEvent('fullscreen',{detail:{fullscreen}}))
}
export {input,output,util}