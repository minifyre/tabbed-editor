import util from './tabbed.util.mjs'
const output={}
output.tabEvt=(el,detail)=>el.dispatchEvent(new CustomEvent('tab',{detail}))
output.tab=function(tab)
{
	const
	{el}=util,
	{id,name}=Object.assign({id:util.id(),name:'untitled'},tab),
	btn=el('input',{checked:true,id,name:'tabs',type:'radio'}),
	label=el('label',{className:'tab',innerHTML:name}),
	icon=el('button',{className:'icon','data-ext':'',innerHTML:'x'})
	label.setAttribute('data-pointerdown','tabSwitch')
	icon.setAttribute('data-pointerdown','tabClose')
	label.setAttribute('for',id)
	label.prepend(icon)
	return [btn,label]
}
output.toggleFullscreen=function(el,on=!JSON.parse(el.getAttribute('fullscreen')))
{
	el.setAttribute('fullscreen',on)
	return on
}
export {output,util}