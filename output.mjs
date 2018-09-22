import {config,logic,util} from './logic.mjs'
const output={}
output.event=(el,type,evt)=>el.dispatchEvent(new CustomEvent(type,evt))
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
export {config,logic,output,util}