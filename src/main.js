const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
    { logo: 'M', url: 'https://developer.mozilla.org/zh-CN/' },
    { logo: 'G', url: 'https://github.com/' },
];
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//正则表达式 删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
                <use xlink:href="#icon-Close"></use>
            </svg> 
            </div>
        </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(hashMap)
            hashMap.splice(index, 1)//删除一个哈希对象
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是什么？')
        if (url.indexOf('http') !== 0) { url = 'https://' + url }
        console.log(url)
        //没有哈希函数时
        // const $site = $(`<li>
        // <a href="${url}">
        // <div class="site">
        //     <div class="logo">${url[0]}</div>
        //     <div class="link">${url}</div>
        // </div>
        //  </a>
        // </li>`).insertBefore($lastLi)

        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        })
        render()
    })
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})