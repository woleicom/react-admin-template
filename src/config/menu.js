const menu = [
    {
        key: '/index',
        title: '首页',
        icon: 'HomeOutlined',
    },
    {
        title: 'Test',
        key: '/test',
        icon: 'BarsOutlined',
        subs: [
            {
                title: 'Test1',
                key: '/test/test1',
                icon: '',
            },
            {
                title: 'Test2',
                key: '/test/test2',
                icon: '',
                subs: [
                    { title: 'Test21', key: '/test/test2/test21', icon: '' },
                    { title: 'Test22', key: '/test/test2/test22', icon: '' },
                ]
            }
        ]
    },
    {
        title: 'Demo',
        key: '/demo',
        icon: 'BarsOutlined',
        subs: [
            {
                title: 'Demo',
                key: '/demo/demo',
                icon: '',
                subs: [
                    {
                        title: 'Detail',
                        key: '/demo/demo1/detail',
                        hidden: true
                    }
                ]
            }
        ]
    }
]

module.exports = menu
