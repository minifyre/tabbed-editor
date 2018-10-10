import silo from './input.mjs'
const
{config,input,logic,util}=silo,
{v}=util
function output({fullscreen,tab,tabs})
{
	const pointerdown=function(evt)
	{
		const
		evt2emit=input(evt),
		editor=util.evt2customEl(evt)

		silo.output.rerender(editor)
		if(evt2emit) output.event(editor,evt2emit)
	}
	return [v('style',{},config.css),
		v('header',{data:{fullscreen},on:{pointerdown}},
		v('button',{data:{pointerdown:'toggleFullscreen'},title:'fullscreen'},'x'),
		//v('button',{title:'settings'},'='),
		v('button',{data:{pointerdown:'tabNew'},title:'new tab'},'+'),
			v('.tabs',{},
				...tabs.map(function({id,name})
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
}
Object.assign(silo,{output,v})
output.rerender=function(editor)
{
	const newDom=output(editor.state,silo.input)
	v.flatUpdate(editor.shadowRoot,newDom,editor.dom,1,1)
	editor.dom=newDom//@todo pureify
}
output.event=(el,evt)=>el.dispatchEvent(new CustomEvent(evt.type,evt))
export default Object.assign(silo,{output})