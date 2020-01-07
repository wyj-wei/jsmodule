export default{
    tplReplace(template,replacObject){
        return template.replace(/{{(.*?)}}/g, (node, key) => {
            return replacObject[key]
        })
    }

}