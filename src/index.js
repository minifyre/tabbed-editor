import silo from './node_modules/silo/index.js'
import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'

const {config,util,logic,output,input}=silo

export default silo(async function tabbed(url='/node_modules/tabbed-editor/')
{
	await util.mkCustomEl(url,'tabbed-editor',tabbed.editor)
})
tabbed.editor=class extends silo.customElement
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