export function formatEnumValue(enumValue: string): string {
    // Replace underscores with spaces
    let result = enumValue.replace(/_/g, ' ');

    // Capitalize the first letter of each word
    result = result.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');

    return result;
}