import {input,output,util} from './tabbed.input.mjs'
const config={}
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
	//@todo add a tabs property to show the id & name of every tab
	get fullscreen()
	{
		return JSON.parse(this.shadowRoot.querySelector('header').getAttribute('fullscreen'))
	}
	set fullscreen(val)
	{
		return this.shadowRoot.querySelector('header').setAttribute('fullscreen',val)
	}
}