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
 * This file is part of the X-ITE Project.
 *
 * X-ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X-ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X-ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"x-ite/Components/Texturing/X3DTextureNode",
	"x-ite/Bits/X3DConstants",
],
function ($,
          X3DTextureNode, 
          X3DConstants)
{
"use strict";

	function X3DEnvironmentTextureNode (executionContext)
	{
		X3DTextureNode .call (this, executionContext);

		this .addType (X3DConstants .X3DEnvironmentTextureNode);
	}

	X3DEnvironmentTextureNode .prototype = $.extend (Object .create (X3DTextureNode .prototype),
	{
		constructor: X3DEnvironmentTextureNode,
		initialize: function ()
		{
			X3DTextureNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .target = gl .TEXTURE_CUBE_MAP;

			this .targets = [
				gl .TEXTURE_CUBE_MAP_POSITIVE_Z, // Front
				gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, // Back
				gl .TEXTURE_CUBE_MAP_NEGATIVE_X, // Left
				gl .TEXTURE_CUBE_MAP_POSITIVE_X, // Right
				gl .TEXTURE_CUBE_MAP_POSITIVE_Y, // Top
				gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, // Bottom
			];
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
			{
				this .getBrowser () .getBrowserOptions () .TextureQuality_ .addInterest ("set_textureQuality__", this);
	
				this .set_textureQuality__ ();
			}
			else
				this .getBrowser () .getBrowserOptions () .TextureQuality_ .removeInterest ("set_textureQuality__", this);
		},
		set_textureQuality__: function ()
		{
			var textureProperties = this .getBrowser () .getDefaultTextureProperties ();

			this .updateTextureProperties (this .target, false, textureProperties, 128, 128, false, false, false);
		},
		getTarget: function ()
		{
			return this .target;
		},
		getTargets: function ()
		{
			return this .targets;
		},
		setShaderUniforms: function (gl, shaderObject, i)
		{
			shaderObject .textureTypeArray [i] = 4;
			gl .activeTexture (gl .TEXTURE4);
			gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .getTexture ());
			gl .uniform1iv (shaderObject .x3d_TextureType, shaderObject .textureTypeArray); // TODO: Put this in X3DProgramableShaderObject
		},
	});

	return X3DEnvironmentTextureNode;
});

