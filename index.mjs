import silo from './output.mjs'
const
{config,input,logic,output,util}=silo,
{truth,v}=util
export default async function tabbed(url='/node_modules/tabbed-editor/')
{
	await util.mkCustomEl(url,'tabbed-editor',tabbed.editor)
}
Object.assign(tabbed,silo)
tabbed.editor=class extends silo.viewer
{
	constructor(state={})
	{
		super()
		this.state=logic(state)
		this.render=v.render(this.shadowRoot,this,output)
	}
	static get observedAttributes()
	{
		return ['fullscreen']
	}
	get fullscreen()
	{
		return !!this.state.view.fullscreen
	}
	set fullscreen(val)
	{
		return this.state.view.fullscreen=!!val
	}
}