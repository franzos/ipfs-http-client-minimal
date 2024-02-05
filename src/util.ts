const convertToKebabCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const buildUrlWithParams = (url: string, params) => {
    if (!params || Object.keys(params).length === 0) return url
    const queryParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
            const kebabCaseKey = convertToKebabCase(key)
            queryParams.append(kebabCaseKey, String(value))
        }
    }
    const fullUrl = `${url}?${queryParams.toString()}`
    return fullUrl
}

export const parseNdjson = (data) => {
    const results = []
    const lines = data.split('\n')

    for (const line of lines) {
        if (line.trim() !== '') {
            try {
                const parsedLine = JSON.parse(line)
                results.push(parsedLine)
            } catch (error) {
                console.error(`Error parsing line: ${line}`)
            }
        }
    }

    return results
}
