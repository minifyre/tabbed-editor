import {config,input,logic,output,util} from './input.mjs'
//@todo disable content if no tabs
export default async function tabbed(url='/node_modules/tabbed-editor/')
{
	const
	files=['css','html'].map(ext=>url+'index.'+ext),
	[css,html]=await util.importFiles(files)
	config.dom=`<style>${css}</style>${html}`
	customElements.define('tabbed-editor',tabbed.editor)
}
Object.assign(tabbed,{config,input,logic,output,util})
tabbed.editor=class extends HTMLElement
{
	constructor()
	{
		super()
		//@todo always have a tab open, if closing the last one, open a new one
		this.state=logic()
		const shadow=this.attachShadow({mode:'open'})
		shadow.innerHTML=config.dom
		output.tabs(this)
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
	//@todo add a tabs property to show the id & name of every tab
	get fullscreen()
	{
		return JSON.parse(this.shadowRoot.querySelector('header').getAttribute('fullscreen'))
	}
	get tab()
	{
		return (this.shadowRoot.querySelector(':checked')||{}).id
	}
	set fullscreen(val)
	{
		return this.shadowRoot.querySelector('header').setAttribute('fullscreen',val)
	}
}