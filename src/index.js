import silo from './node_modules/silo/index.js'
import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'

const
{config,util,logic,output,input}=silo,
{curry}=util

export default silo(async function tabbed(initialState)
{
	customElements.define('tabbed-editor',silo.editor)

})
silo.editor=class extends silo.customElement
{
	constructor(state={})
	{
		super()

		let renderer=x=>x

		this.state=truth(logic(state),(...args)=>renderer(args)).state
		this.render=renderer=v.render(this.shadowRoot,this,output)
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