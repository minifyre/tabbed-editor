import util from './tabbed.util.mjs'
const
config={},
output={}
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
input.toggleFullscreen=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	fullscreen=output.toggleFullscreen(target.parentElement)
	editor.setAttribute('fullscreen',fullscreen)
	editor.dispatchEvent(new CustomEvent('fullscreen',{detail:{fullscreen}}))
}
output.toggleFullscreen=function(el,on=!JSON.parse(el.getAttribute('fullscreen')))
{
	el.setAttribute('fullscreen',on)
	return on
}
input.tabClose=function({path,target})
{
	const
	editor=path.find(x=>(x.tagName||'').toLowerCase()==='tabbed-editor'),
	tabs=util.findParent(target,'header').querySelector('.tabs'),
	tab=util.findParent(target,'.tab'),
	id=tab.getAttribute('for'),
	btn=tab.previousSibling
	btn.remove()
	tab.remove()
	editor.dispatchEvent(new CustomEvent('tab',{detail:{close:id}}))
	const next=tabs.querySelector('[type=radio]')
	if(next)
	{
		next.checked=true
		editor.dispatchEvent(new CustomEvent('tab',{detail:{open:next.id}}))
	}
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
output.tab=function(tab)
{
	const
	{id,name}=Object.assign({id:util.id(),name:'untitled'},tab),
	mk=(el,opts)=>Object.assign(document.createElement(el),opts),
	btn=mk('input',{checked:true,id,name:'tabs',type:'radio'}),
	label=mk('label',{className:'tab',innerHTML:name}),
	icon=mk('button',{className:'icon','data-ext':'',innerHTML:'x'})
	label.setAttribute('data-pointerdown','tabSwitch')
	icon.setAttribute('data-pointerdown','tabClose')
	label.setAttribute('for',id)
	label.prepend(icon)
	return [btn,label]
}
//@todo disable content if no tabs
export default async function tabbed(url='/node_modules/tabbed-editor/')
{
	const
	files=['css','html'].map(ext=>url+'tabbed.'+ext),
	[css,html]=await util.importFiles(files)
	config.dom=`<style>${css}</style>${html}`
	customElements.define('tabbed-editor',tabbed.editor)
}
tabbed.editor=class extends HTMLElement
{
	constructor()
	{
		super()
		this.state=[]
		const shadow=this.attachShadow({mode:'open'})
		shadow.innerHTML=config.dom
		input(shadow.querySelector('header'),'pointerdown')
	}
	attributeChangedCallback(attr,oldVal,newVal)
	{
		const {shadowRoot}=this
		if (attr==='fullscreen'&&oldVal!==newVal)
		{
			output.toggleFullscreen(shadowRoot.querySelector('header'),newVal)
		}
		return newVal
	}
	connectedCallback()
	{
		const editor=this
	}
	adoptedCallback()
	{
		console.error('add adoptedCallback behavior')
	}
	disconnectedCallback()
	{
		console.error('add disconnectedCallback behavior')
	}
	static get observedAttributes()
	{
		return ['fullscreen']
	}
	get fullscreen()
	{
		return JSON.parse(this.shadowRoot.querySelector('header').getAttribute('fullscreen'))
	}
	set fullscreen(val)
	{
		return this.shadowRoot.querySelector('header').setAttribute('fullscreen',val)
	}
}