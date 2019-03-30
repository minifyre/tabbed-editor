output.event=(el,evt)=>el.dispatchEvent(new CustomEvent(evt.type,evt))
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
	},
	app=v(editor.state.view.app||'div',{style:'height:100%; width:100%;'}),
	//@todo the line below is fragile if not used in the node_modules setup
	type=editor.state.view.app?`${editor.state.view.app}`:'tabbed-editor',
	style=`background-image:url(./node_modules/${type}/icon.svg);`

	return [v('style',{},config.style),
		v('header',{data:{fullscreen},on:{pointerdown}},
			v('button.type',{data:{pointerdown:'toggleAppSelection'},style,title:'change app type'}),
			v('button',{data:{pointerdown:'toggleFullscreen'},title:'fullscreen'},'x'),
			v('button',{data:{pointerdown:'tabNew'},title:'new tab'},'+'),
			v('.tabs',{},
				...tabs
				.filter(x=>!!x)
				.map(function({id,name})
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
			v('slot',{},app),
			output.appDrawer(editor)
		)
	]
}
output.appDrawer=function(sandbox)
{
	const attrs={}

	if(!sandbox.state.view.showAppDrawer) attrs.hidden='hidden'

	return v('.app-drawer',attrs,
		...Object.entries(config.apps)
		.map(function([app,{src}])
		{
			const
			style=`background-image:url(${src}icon.svg)`,
			pointerup=curry(input.appSwitch,sandbox)

			return v('.app',{data:{app},on:{pointerup},style})
		})
	)
}