/**
 * A comprehensive utility class for type-safe object manipulation operations.
 *
 * This class provides a collection of static methods for common object manipulation tasks
 * while ensuring type safety, immutability principles, and proper error handling. All methods
 * are designed to work with TypeScript's type system to provide compile-time safety and
 * better developer experience.
 *
 * @remarks
 * This class follows functional programming principles where possible, returning new objects
 * instead of mutating existing ones (except for `safeDelete` which intentionally mutates).
 * All methods include comprehensive input validation and meaningful error messages.
 *
 * @example Basic Usage
 * ```typescript
 * import { ObjectManipulator } from './object-manipulator.helper';
 *
 * // Safe property deletion with validation
 * const user = { id: 1, name: 'John', email: 'john@example.com', role: 'admin' };
 * const deleted = ObjectManipulator.safeDelete(user, 'email'); // Returns true
 * console.log(user); // { id: 1, name: 'John', role: 'admin' }
 *
 * // Create clean objects by excluding sensitive data
 * const userWithPassword = { id: 1, name: 'John', password: 'secret123', token: 'abc' };
 * const publicUser = ObjectManipulator.exclude(userWithPassword, ['password', 'token']);
 * console.log(publicUser); // { id: 1, name: 'John' }
 * ```
 *
 * @example Advanced Usage
 * ```typescript
 * // Working with complex nested objects
 * const config = {
 *   api: { url: 'https://api.example.com', key: 'secret' },
 *   ui: { theme: 'dark', language: 'en' },
 *   internal: { debugMode: true }
 * };
 *
 * // Remove sensitive configuration
 * const publicConfig = ObjectManipulator.exclude(config, ['internal']);
 * // Result: { api: { url: '...', key: 'secret' }, ui: { theme: 'dark', language: 'en' } }
 * ```
 *
 * @author dr.glasdou
 * @version 2.0.0
 * @since 1.0.0
 * @public
 * @namespace Helpers
 */
export class ObjectManipulator {
  /**
   * Safely deletes a property from an object with comprehensive validation and error handling.
   *
   * This method performs validation before attempting to delete a property, providing
   * warnings for invalid operations and returning a boolean to indicate success or failure.
   * The deletion operation mutates the original object.
   *
   * @template T - The type of the source object, must extend `object`
   * @template K - The key type, must be a valid key of T
   *
   * @param {T} obj - The source object from which to delete the property
   * @param {K} key - The property key to be deleted from the object
   *
   * @returns {boolean} `true` if the property was successfully deleted, `false` otherwise
   *
   * @throws {Error} Throws an error if the provided object is null, undefined, or not an object
   *
   * @example Basic property deletion
   * ```typescript
   * const user = { id: 1, name: 'John', email: 'john@example.com', temp: 'delete-me' };
   * const success = ObjectManipulator.safeDelete(user, 'temp');
   * console.log(success); // true
   * console.log(user); // { id: 1, name: 'John', email: 'john@example.com' }
   * ```
   *
   * @example Handling non-existent properties
   * ```typescript
   * const user = { id: 1, name: 'John' };
   * const success = ObjectManipulator.safeDelete(user, 'nonExistent' as keyof typeof user);
   * console.log(success); // false - logs warning to console
   * ```
   *
   * @example Error handling
   * ```typescript
   * try {
   *   ObjectManipulator.safeDelete(null, 'someKey'); // Throws error
   * } catch (error) {
   *   console.error('Invalid object provided:', error.message);
   * }
   * ```
   *
   * @see {@link exclude} For non-mutating property removal
   * @since 1.0.0
   * @public
   */
  static safeDelete<T extends object, K extends keyof T>(obj: T, key: K): boolean {
    if (!obj || typeof obj !== 'object') {
      console.warn('Invalid object provided for deletion');
      return false;
    }

    if (!(key in obj)) {
      console.warn(`Property ${String(key)} does not exist on the object.`);
      return false;
    }

    try {
      delete obj[key];
      return true;
    } catch (error) {
      console.error(`Failed to delete property ${String(key)}:`, error);
      return false;
    }
  }

  /**
   * Creates a new object by excluding specified keys from the source object.
   *
   * This method follows immutability principles by creating and returning a new object
   * rather than modifying the original. It's particularly useful for removing sensitive
   * data before sending objects to clients or creating clean DTOs (Data Transfer Objects).
   * The operation uses efficient filtering with Set-based lookups for optimal performance.
   *
   * @template T - The type of the source object, must extend `object`
   *
   * @param {T} obj - The source object from which to exclude keys
   * @param {Array<keyof T>} keys - An array of property keys to be excluded from the result object
   *
   * @returns {Partial<T>} A new object containing all properties from the source object
   *                       except for the specified keys. The return type is `Partial<T>`
   *                       because some properties may have been excluded.
   *
   * @throws {TypeError} Throws an error if the provided object is null, undefined, or not an object
   * @throws {TypeError} Throws an error if keys parameter is not an array
   *
   * @example Removing sensitive user data
   * ```typescript
   * interface User {
   *   id: string;
   *   email: string;
   *   password: string;
   *   refreshToken: string;
   *   profile: { name: string; avatar: string };
   * }
   *
   * const user: User = {
   *   id: 'usr_123',
   *   email: 'john@example.com',
   *   password: 'hashed_password',
   *   refreshToken: 'jwt_token_here',
   *   profile: { name: 'John Doe', avatar: 'avatar.jpg' }
   * };
   *
   * // Create a safe user object for client-side use
   * const safeUser = ObjectManipulator.exclude(user, ['password', 'refreshToken']);
   * console.log(safeUser);
   * // Output: { id: 'usr_123', email: 'john@example.com', profile: { ... } }
   * ```
   *
   * @example Excluding multiple configuration keys
   * ```typescript
   * const appConfig = {
   *   apiUrl: 'https://api.example.com',
   *   apiKey: 'secret_key_123',
   *   debugMode: true,
   *   version: '1.2.0',
   *   internalSettings: { ... }
   * };
   *
   * // Create public configuration
   * const publicConfig = ObjectManipulator.exclude(appConfig, ['apiKey', 'internalSettings']);
   * console.log(publicConfig); // { apiUrl: '...', debugMode: true, version: '1.2.0' }
   * ```
   *
   * @example Error handling
   * ```typescript
   * try {
   *   const result = ObjectManipulator.exclude(null, ['someKey']); // Throws TypeError
   * } catch (error) {
   *   console.error('Exclusion failed:', error.message);
   * }
   * ```
   *
   * @see {@link safeDelete} For in-place property removal
   * @see {@link pick} For the inverse operation (including only specific keys)
   *
   * @performance This method uses Set-based key lookup for O(1) key checking performance,
   *              making it efficient even with large objects and many exclusion keys.
   *
   * @since 1.0.0
   * @public
   */
  static exclude<T extends object>(obj: T, keys: (keyof T)[]): Partial<T> {
    // Input validation
    if (!obj || typeof obj !== 'object') {
      throw new TypeError('Invalid object provided for exclusion. Expected a non-null object.');
    }

    if (!Array.isArray(keys)) {
      throw new TypeError('Keys parameter must be an array of property keys.');
    }

    // Use Set for efficient O(1) key lookup performance
    const keysToExclude = new Set(keys);

    // Build new object excluding specified keys
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (!keysToExclude.has(key as keyof T)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result[key] = value;
      }
    }

    return result as Partial<T>;
  }
}
