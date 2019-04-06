// Slugify by @hagemann
// References: https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
export const slugify = (str: string) => {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export const generateName = (
  whichType: string,
  incremental: (...args: any[]) => string,
  context?: any,
) => {
  const next = incremental(context)
  return slugify(`${whichType}___${next}`)
}

export const getBaraName = (
  userDefinedName: string | number,
  ns = 'dev.barajs',
) => {
  const definedName = userDefinedName + ''
  const domain = definedName.indexOf('.') > -1 ? '' : ns
  const names = definedName.split('.').map(s => slugify(s))
  const name = [domain, ...names]
    .filter(s => s.length && s.length > 0)
    .join('.')
  return name
}
