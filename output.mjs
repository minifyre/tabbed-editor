import silo from './input.mjs'
const
{config,input,logic,util}=silo,
{v}=util
function output(editor)
{
	const
	{tabs}=editor.state.file,
	{fullscreen,tab}=editor.state.view,
	on={pointerdown:evt=>output.event(editor,input(evt))}

	return [v('style',{},config.css),
		v('header',{data:{fullscreen},on},
			v('button',{data:{pointerdown:'toggleFullscreen'},title:'fullscreen'},'x'),
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
output.event=(el,evt)=>evt&&el.dispatchEvent(new CustomEvent(evt.type,evt))
export default Object.assign(silo,{output})