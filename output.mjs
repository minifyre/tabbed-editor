import {config,logic,util} from './logic.mjs'
import v from './node_modules/v/v.mjs'
const output=function({fullscreen,tab,tabs},input)
{
	return [v('style',{},config.css),
		v('header',{data:{fullscreen},on:{pointerdown:input}},
		v('button',{data:{pointerdown:'toggleFullscreen'},title:'fullscreen'},'x'),
		v('button',{title:'settings'},'='),
		v('button',{data:{pointerdown:'tabNew'},title:'new tab'},'+'),
			v('.tabs',{},
				...tabs.map(function({id,name},i)
				{
					const classes=tab===id?'selected':''
					return v('.tab',{class:classes,data:{pointerdown:'tabSwitch'},id},
						v('button.icon',{data:{pointerdown:'tabClose'}},'x'),
						name
					)
				})
			)
		),
		v('main',{},
			v('slot')
		)
	]
	//v.update=function(parent,newNode,oldNode,child=parent.childNodes[0])
}
output.rerender=function(editor,input)
{
	const newDom=output(editor.state,input)
	v.flatUpdate(editor.shadowRoot,newDom,editor.dom,1,1)
	editor.dom=newDom//@todo pureify
}
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
//unlike output.tab, this takes an editor obj
//@todo kill this off when dom updates become more streamlined
output.tabs=function({state,shadowRoot:root})
{
	const form=root.querySelector('.tabs')
	state.tabs
	.map(tab=>output.tab(tab).reverse())//make buttons get added first
	.reduce((arr,x)=>arr.concat(x),[])//flatten
	.reverse()//add last items first since they are getting prepended
	.forEach(el=>form.append(el))
}
export {config,logic,output,util,v}