output.render=function(editor)
{
	const
	{tabs}=editor.state.file,
	{fullscreen,tab}=editor.state.view,
	pointerdown=function(evt,editor=util.evt2customEl(evt))
	{
		const evt2emit=input(editor,evt)
		editor.render()
		if(evt2emit) output.event(editor,evt2emit)
	}
	return [v('style',{},config.style),
		v('header',{data:{fullscreen},on:{pointerdown}},
			v('button',{data:{pointerdown:'toggleAppSelection'},title:'change app type'},'::'),
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
output.event=(el,evt)=>el.dispatchEvent(new CustomEvent(evt.type,evt))