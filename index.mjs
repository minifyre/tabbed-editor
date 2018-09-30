import {config,input,logic,output,util,v} from './input.mjs'
//@todo disable content if no tabs
export default async function tabbed(url='/node_modules/tabbed-editor/')
{
	const
	[css]=await util.importFiles([url+'index.css'])
	config.css=css
	customElements.define('tabbed-editor',tabbed.editor)
}
Object.assign(tabbed,{config,input,logic,output,util,v})
tabbed.editor=class extends HTMLElement
{
	constructor(state={})
	{
		super()
		const shadow=this.attachShadow({mode:'open'})
		this.state=logic(state)
		this.dom=output(this.state,input)
		v.flatUpdate(shadow,this.dom)
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