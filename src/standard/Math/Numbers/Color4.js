/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"standard/Math/Numbers/Color3",
	"standard/Math/Algorithm",
],
function (Color3, Algorithm)
{
"use strict";

	var clamp = Algorithm .clamp;

	function Color4 (r, g, b, a)
	{
		if (arguments .length)
		{
			this .r_ = clamp (r, 0, 1);
			this .g_ = clamp (g, 0, 1);
			this .b_ = clamp (b, 0, 1);
			this .a_ = clamp (a, 0, 1);
		}
		else
		{
			this .r_ = 0;
			this .g_ = 0;
			this .b_ = 0;
			this .a_ = 0;
		}
	}

	Color4 .prototype =
	{
		constructor: Color4,
		length: 4,
		copy: function ()
		{
			var copy = Object .create (Color4 .prototype);
			copy .r_ = this .r_;
			copy .g_ = this .g_;
			copy .b_ = this .b_;
			copy .a_ = this .a_;
			return copy;
		},
		assign: function (color)
		{
			this .r_ = color .r_;
			this .g_ = color .g_;
			this .b_ = color .b_;
			this .a_ = color .a_;
		},
		set: function (r, g, b, a)
		{
			this .r_ = clamp (r, 0, 1);
			this .g_ = clamp (g, 0, 1);
			this .b_ = clamp (b, 0, 1);
			this .a_ = clamp (a, 0, 1);
		},
		equals: function (color)
		{
			return this .r_ === color .r_ &&
			       this .g_ === color .g_ &&
			       this .b_ === color .b_ &&
			       this .a_ === color .a_;
		},
		getHSVA: function (result)
		{
			Color3 .prototype .getHSV .call (this, result);

			result [3] = this .a_;

			return result;
		},
		setHSVA: function (h, s, v, a)
		{
			Color3 .prototype .setHSV .call (this, h, s, v);

			this .a_ = clamp (a, 0, 1);
		},
		toString: function ()
		{
			return this .r_ + " " +
			       this .g_ + " " +
			       this .b_ + " " +
			       this .a_;
		},
	};

	var r = {
		get: function () { return this .r_; },
		set: function (value) { this .r_ = clamp (value, 0, 1); },
		enumerable: true,
		configurable: false
	};
	
	var g = {
		get: function () { return this .g_; },
		set: function (value) { this .g_ = clamp (value, 0, 1); },
		enumerable: true,
		configurable: false
	};

	var b = {
		get: function () { return this .b_; },
		set: function (value) { this .b_ = clamp (value, 0, 1); },
		enumerable: true,
		configurable: false
	};

	var a = {
		get: function () { return this .a_; },
		set: function (value) { this .a_ = clamp (value, 0, 1); },
		enumerable: true,
		configurable: false
	};

	Object .defineProperty (Color4 .prototype, "r", r);
	Object .defineProperty (Color4 .prototype, "g", g);
	Object .defineProperty (Color4 .prototype, "b", b);
	Object .defineProperty (Color4 .prototype, "a", a);

	r .enumerable = false;
	g .enumerable = false;
	b .enumerable = false;
	a .enumerable = false;

	Object .defineProperty (Color4 .prototype, "0", r);
	Object .defineProperty (Color4 .prototype, "1", g);
	Object .defineProperty (Color4 .prototype, "2", b);
	Object .defineProperty (Color4 .prototype, "3", a);

	Object .assign (Color4,
	{
		HSV: function (h, s, v, a)
		{
			var color = new Color4 (0, 0, 0, a);
			color .setHSV (h, s, v);
			return color;
		},
		lerp: function (a, b, t, r)
		{
			// Linearely interpolate in HSVA space between source color @a a and destination color @a b by an amount of @a t.
			// Source and destination color must be in HSVA space. The resulting HSVA color is stored in @a r.

			var range = Math .abs (b [0] - a [0]);

			if (range <= Math .PI)
			{
				r [0] = Algorithm .lerp (a [0], b [0], t);
				r [1] = Algorithm .lerp (a [1], b [1], t);
				r [2] = Algorithm .lerp (a [2], b [2], t);
				r [3] = Algorithm .lerp (a [3], b [3], t);
				return r;
			}

			var
				PI2  = Math .PI * 2,
				step = (PI2 - range) * t,
				h    = a [0] < b [0] ? a [0] - step : a [0] + step;

			if (h < 0)
				h += PI2;

			else if (h > PI2)
				h -= PI2;

			r [0] = h;
			r [1] = Algorithm .lerp (a [1], b [1], t);
			r [2] = Algorithm .lerp (a [2], b [2], t);
			r [3] = Algorithm .lerp (a [3], b [3], t);
			return r;
		},
	});

	return Color4;
});
