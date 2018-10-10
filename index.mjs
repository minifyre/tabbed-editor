import silo from './output.mjs'
const
{config,input,logic,output,util}=silo,
{truth,v}=util
export default async function tabbed(url='/node_modules/tabbed-editor/')
{
	await silo(url,'tabbed-editor',tabbed.editor)
}
Object.assign(tabbed,silo)
tabbed.editor=class extends silo.viewer
{
	constructor(state={})
	{
		super(state)
		// let renderer=x=>x
		// this.state=truth(logic(state),(...args)=>renderer(args))
		// renderer=v.render(this.shadowRoot,this,output)
		this.state=logic(state)
		this.dom=output(this)
		v.flatUpdate(this.shadowRoot,this.dom)
	}
	attributeChangedCallback(attr,oldVal,newVal)
	{
		return newVal
	}
	static get observedAttributes()
	{
		return ['fullscreen']
	}
	//@todo refer these into state
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