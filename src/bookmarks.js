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


var Bookmarks = (function ()
{
"use strict";

	function Bookmarks (browser, element, filesPerPage)
	{
		this .browser = browser;
		this .element = element;
	}

	Bookmarks .prototype =
	{
		setup: function (array)
		{
			for (var a = 0; a < array .length; ++ a)
			{
				var
					bookmarks = array [a],
					server    = bookmarks .server;

				for (var i = 0, length = bookmarks .length; i < length; ++ i)
				{
					var
						bookmark  = bookmarks [i],
						component = bookmark .component,
						test      = bookmark .test,
						path      = bookmark .path;
	
					if (test)
					{
						var element = $('<span/>')
							.addClass ('example-box')
							.attr ('title', component + ' » ' + test)
							.append ($("<a/>")
								.addClass ('display-example')
								.attr ('href', server + '/' + component + '/' + test + '/' + test + '.x3d')
								.attr ('style', 'background-image:url(' + server + '/' + component + '/' + test + '/screenshot-small.png)')
								.click (this .loadURL .bind (this, server + '/' + component + '/' + test + '/' + test + '.x3d')));
					}
					else if (path)
					{
						if (! path .match (/\.(?:x3d|x3dz|x3dv|x3dvz|x3dj|x3djz|wrl|wrz)$/))
							continue;

						var basename = path .match (/([^\/]+)\.\w+$/);
						var name     = basename [1] .replace (/([A-Z]+)/g, ' $1');

						var element = $('<span/>')
							.addClass ('example-box')
							.attr ('title', path)
							.append ($("<a/>")
								.addClass ('display-example')
								.attr ('href', server + '/' + path)
								.click (this .loadURL .bind (this, server + '/' + path))
								.text (name));
					}
					else if (component)
					{
						var element = $('<span/>')
							.addClass ('example-box')
							.attr ('title', path)
							.addClass ('display-component')
							.text (component);
					}

					this .element .append (element);
				}
			}
		},
		restore: function (first)
		{
			var url = this .browser .getLocalStorage () ["Bookmarks.url"];

			if (url)
				this .loadURL (url);
			else
				this .loadURL (first);
		},
		loadURL: function (url)
		{
			this .browser .getLocalStorage () ["Bookmarks.url"] = url;
			this .browser .loadURL (new X3D .MFString (url), new X3D .MFString ());
			return false;
		},
	};

	return Bookmarks;
}) ();
