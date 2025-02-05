"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentChangeLocation = exports.SelectionLocation = exports.CursorLocation = exports.RecentlyClosedEditor = exports.NavigationLocation = exports.Range = exports.Position = void 0;
const uri_1 = require("@theia/core/lib/common/uri");
const editor_1 = require("../editor");
Object.defineProperty(exports, "Position", { enumerable: true, get: function () { return editor_1.Position; } });
Object.defineProperty(exports, "Range", { enumerable: true, get: function () { return editor_1.Range; } });
var NavigationLocation;
(function (NavigationLocation) {
    /**
     * The navigation location type.
     */
    let Type;
    (function (Type) {
        /**
         * Cursor position change type.
         */
        Type[Type["CURSOR"] = 0] = "CURSOR";
        /**
         * Text selection change type.
         */
        Type[Type["SELECTION"] = 1] = "SELECTION";
        /**
         * Content change type.
         */
        Type[Type["CONTENT_CHANGE"] = 2] = "CONTENT_CHANGE";
    })(Type = NavigationLocation.Type || (NavigationLocation.Type = {}));
    let Context;
    (function (Context) {
        /**
         * Returns with the type for the context.
         */
        function getType(context) {
            if (editor_1.Position.is(context)) {
                return Type.CURSOR;
            }
            if (editor_1.Range.is(context)) {
                return Type.SELECTION;
            }
            if (editor_1.TextDocumentContentChangeDelta.is(context)) {
                return Type.CONTENT_CHANGE;
            }
            throw new Error(`Unexpected context for type: ${context}.`);
        }
        Context.getType = getType;
    })(Context = NavigationLocation.Context || (NavigationLocation.Context = {}));
})(NavigationLocation || (exports.NavigationLocation = NavigationLocation = {}));
(function (NavigationLocation) {
    /**
     * Transforms the location into an object that can be safely serialized.
     */
    function toObject(location) {
        const { uri, type } = location;
        const context = (() => {
            if (CursorLocation.is(location)) {
                return CursorLocation.toObject(location.context);
            }
            if (SelectionLocation.is(location)) {
                return SelectionLocation.toObject(location.context);
            }
            if (ContentChangeLocation.is(location)) {
                return ContentChangeLocation.toObject(location.context);
            }
        })();
        return {
            uri: uri.toString(),
            type,
            context
        };
    }
    NavigationLocation.toObject = toObject;
    /**
     * Returns with the navigation location object from its serialized counterpart.
     */
    function fromObject(object) {
        const { uri, type } = object;
        if (uri !== undefined && type !== undefined && object.context !== undefined) {
            const context = (() => {
                switch (type) {
                    case NavigationLocation.Type.CURSOR: return CursorLocation.fromObject(object.context);
                    case NavigationLocation.Type.SELECTION: return SelectionLocation.fromObject(object.context);
                    case NavigationLocation.Type.CONTENT_CHANGE: return ContentChangeLocation.fromObject(object.context);
                }
            })();
            if (context) {
                return {
                    uri: toUri(uri),
                    context,
                    type
                };
            }
        }
        return undefined;
    }
    NavigationLocation.fromObject = fromObject;
    /**
     * Returns with the context of the location as a `Range`.
     */
    function range(location) {
        if (CursorLocation.is(location)) {
            return editor_1.Range.create(location.context, location.context);
        }
        if (SelectionLocation.is(location)) {
            return location.context;
        }
        if (ContentChangeLocation.is(location)) {
            return location.context.range;
        }
        throw new Error(`Unexpected navigation location: ${location}.`);
    }
    NavigationLocation.range = range;
    /**
     * Creates a new navigation location object.
     */
    function create(uri, context) {
        const type = NavigationLocation.Context.getType(context);
        return {
            uri: toUri(uri),
            type,
            context
        };
    }
    NavigationLocation.create = create;
    /**
     * Returns with the human-consumable (JSON) string representation of the location argument.
     */
    function toString(location) {
        return JSON.stringify(toObject(location));
    }
    NavigationLocation.toString = toString;
})(NavigationLocation || (exports.NavigationLocation = NavigationLocation = {}));
function toUri(arg) {
    if (arg instanceof uri_1.default) {
        return arg;
    }
    if (typeof arg === 'string') {
        return new uri_1.default(arg);
    }
    return arg.uri;
}
var RecentlyClosedEditor;
(function (RecentlyClosedEditor) {
    /**
     * Transform a RecentlyClosedEditor into an object for storing.
     *
     * @param closedEditor the editor needs to be transformed.
     */
    function toObject(closedEditor) {
        const { uri, viewState } = closedEditor;
        return {
            uri: uri.toString(),
            viewState: viewState
        };
    }
    RecentlyClosedEditor.toObject = toObject;
    /**
     * Transform the given object to a RecentlyClosedEditor object if possible.
     */
    function fromObject(object) {
        const { uri, viewState } = object;
        if (uri !== undefined && viewState !== undefined) {
            return {
                uri: toUri(uri),
                viewState: viewState
            };
        }
        return undefined;
    }
    RecentlyClosedEditor.fromObject = fromObject;
})(RecentlyClosedEditor || (exports.RecentlyClosedEditor = RecentlyClosedEditor = {}));
var CursorLocation;
(function (CursorLocation) {
    /**
     * `true` if the argument is a cursor location. Otherwise, `false`.
     */
    function is(location) {
        return location.type === NavigationLocation.Type.CURSOR;
    }
    CursorLocation.is = is;
    /**
     * Returns with the serialized format of the position argument.
     */
    function toObject(context) {
        const { line, character } = context;
        return {
            line,
            character
        };
    }
    CursorLocation.toObject = toObject;
    /**
     * Returns with the position from its serializable counterpart, or `undefined`.
     */
    function fromObject(object) {
        if (object.line !== undefined && object.character !== undefined) {
            const { line, character } = object;
            return {
                line,
                character
            };
        }
        return undefined;
    }
    CursorLocation.fromObject = fromObject;
})(CursorLocation || (exports.CursorLocation = CursorLocation = {}));
var SelectionLocation;
(function (SelectionLocation) {
    /**
     * `true` if the argument is a selection location.
     */
    function is(location) {
        return location.type === NavigationLocation.Type.SELECTION;
    }
    SelectionLocation.is = is;
    /**
     * Converts the range argument into a serializable object.
     */
    function toObject(context) {
        const { start, end } = context;
        return {
            start: CursorLocation.toObject(start),
            end: CursorLocation.toObject(end)
        };
    }
    SelectionLocation.toObject = toObject;
    /**
     * Creates a range object from its serializable counterpart. Returns with `undefined` if the argument cannot be converted into a range.
     */
    function fromObject(object) {
        if (!!object.start && !!object.end) {
            const start = CursorLocation.fromObject(object.start);
            const end = CursorLocation.fromObject(object.end);
            if (start && end) {
                return {
                    start,
                    end
                };
            }
        }
        return undefined;
    }
    SelectionLocation.fromObject = fromObject;
})(SelectionLocation || (exports.SelectionLocation = SelectionLocation = {}));
var ContentChangeLocation;
(function (ContentChangeLocation) {
    /**
     * `true` if the argument is a content change location. Otherwise, `false`.
     */
    function is(location) {
        return location.type === NavigationLocation.Type.CONTENT_CHANGE;
    }
    ContentChangeLocation.is = is;
    /**
     * Returns with a serializable object representing the arguments.
     */
    function toObject(context) {
        return {
            range: SelectionLocation.toObject(context.range),
            rangeLength: context.rangeLength,
            text: context.text
        };
    }
    ContentChangeLocation.toObject = toObject;
    /**
     * Returns with a text document change delta for the argument. `undefined` if the argument cannot be mapped to a content change delta.
     */
    function fromObject(object) {
        if (!!object.range && object.rangeLength !== undefined && object.text !== undefined) {
            const range = SelectionLocation.fromObject(object.range);
            const rangeLength = object.rangeLength;
            const text = object.text;
            if (!!range) {
                return {
                    range,
                    rangeLength: rangeLength,
                    text: text
                };
            }
        }
        else {
            return undefined;
        }
    }
    ContentChangeLocation.fromObject = fromObject;
})(ContentChangeLocation || (exports.ContentChangeLocation = ContentChangeLocation = {}));
//# sourceMappingURL=navigation-location.js.map